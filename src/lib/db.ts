import {PrismaClient} from '@prisma/client'


export class PrismaManager {
    private static instance: PrismaClient;
    private static isConnected: boolean = false;
    private static readonly maxRetries: number = 3;
    private static readonly retryDelay: number = 5000; // 5 seconds

    public static async getInstance(): Promise<PrismaClient> {
        const excludedMessages: string[] = [
            'unique constraint',        // P2002 (or details)
            'already exists',           // Common detail for P2002
            'duplicate key value',      // Common detail for P2002
            'does not exist',           // P2001, P2021, P2022, or details in P2025
            'violates not-null constraint', // P2011 (or details)
            'operation failed because', // P2025
            'incorrect number of parameters', // P1016 - Raw query parameter mismatch
            'value for the column is too long', // P2000 - Input data validation
            'Foreign key constraint failed',  // P2003 - Relational integrity violation
            'key constraint violated',
            'A constraint failed on the database', // P2004 - Generic constraint violation (could be check, etc.)
            'provided value for',             // P2006 - Invalid input value type/format (using start of message)
            'Data validation error',          // P2007 - Generic data validation
            'Missing a required value',       // P2012 - Input structure error
            'Missing the required argument',  // P2013 - Input structure error
            'violate the required relation',  // P2014 - Relational integrity violation
            'related record could not be found', // P2015 - Relational integrity violation / Not found
            'records for relation',           // P2017 - Attempting operation on disconnected records (using start of message)
            'required connected records were not found', // P2018 - Relational integrity / Not found
            'Input error',                    // P2019 - Generic input error
            'Value out of range',             // P2020 - Input data validation
            'Cannot find a fulltext index',   // P2030 - Schema/query mismatch, often app logic fixable
            'does not fit into a 64 bit signed integer', // P2033 - Input data validation / type mismatch
            'Transaction failed due to a write conflict or a deadlock', // P2034 - Often retryable, not necessarily critical failure
            'invalid input syntax'
        ];

        if (!this.instance) {
            this.instance = new PrismaClient({
                log: [
                    {emit: 'event', level: 'query'},
                    {emit: 'event', level: 'error'},
                    {emit: 'event', level: 'warn'},
                ],
            });

            (this.instance as any).$on('error', (event: { timestamp: Date; message: string; target: string }) => {
                if (!excludedMessages.some(message => event.message.includes(message))) {
                    console.error('Prisma Client error:', event);
                    this.handleDisconnect();
                }
            });

            await this.connect();
        }

        return this.instance;
    }

    private static async connect(retryCount: number = 0): Promise<void> {
        try {
            if (!this.isConnected) {
                await this.instance.$connect();
                this.isConnected = true;
                console.log('Successfully connected to the database');
            }
        } catch (error) {
            console.error(`Database connection failed (Attempt ${retryCount + 1}/${this.maxRetries}):`, error);

            if (retryCount < this.maxRetries) {
                console.log(`Retrying connection in ${this.retryDelay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                await this.connect(retryCount + 1);
            } else {
                console.error('Max retry attempts reached. Unable to establish database connection.');
                throw new Error('Database connection failed after maximum retry attempts');
            }
        }
    }

    private static async handleDisconnect(): Promise<void> {
        this.isConnected = false;
        try {
            await this.instance.$disconnect();
        } catch (error) {
            console.error('Error during disconnect:', error);
        }

        // Attempt to reconnect
        await this.connect();
    }

    public static async disconnect(): Promise<void> {
        if (this.instance && this.isConnected) {
            await this.instance.$disconnect();
            this.isConnected = false;
            console.log('Database connection closed');
        }
    }
}

export const db = await PrismaManager.getInstance();

export const includeRelationsQuery = (include?: string) => {
    if (!include) return undefined;
    const relationSpecs = include ? include.split(',') : [];

    // Create the relation object with nested support
    const includeRelations: Record<string, any> = {};

    for (const spec of relationSpecs) {
        // Split the relation specification into parts
        const [relationPath, ...options] = spec.trim().split(':');
        const paths = relationPath.split('.');

        // Parse options if they exist (format: key=value)
        const relationOptions: Record<string, any> = {};
        if (options.length > 0) {
            options.forEach(option => {
                const [key, value] = option.split('=');
                if (key && value) {
                    relationOptions[key] = convertOptionValue(value);
                }
            });
        }

        if (paths.length === 1) {
            // Simple case: top-level relation
            includeRelations[paths[0]] = options.length > 0
                ? { ...relationOptions }
                : true;
        } else {
            // Handle nested relations
            let current = includeRelations;

            // Process each level of the path except the last one
            for (let i = 0; i < paths.length - 1; i++) {
                const path = paths[i];

                // Initialize the path if needed
                if (!current[path]) {
                    current[path] = { include: {} };
                } else if (!current[path].include === undefined) {
                    // Ensure there's an include property
                    current[path].include = {};
                }

                // Move to the next level (inside the include object)
                current = current[path].include;
            }

            // Set the final nested property
            const lastPath = paths[paths.length - 1];
            current[lastPath] = options.length > 0
                ? { ...relationOptions }
                : true;
        }
    }

    return Object.keys(includeRelations).length > 0 ? includeRelations : undefined;
}

// Helper function to convert string values to appropriate types
function convertOptionValue(value: string): any {
    if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
    if (value === 'true') return true;
    if (value === 'false') return false;

    if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        return arrayContent ? arrayContent.split(',').map(item => convertOptionValue(item.trim())) : [];
    }

    return value;
}