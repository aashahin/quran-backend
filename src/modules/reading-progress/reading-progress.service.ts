import {db, includeRelationsQuery} from "../../lib/db";
import {TCreateReadingProgress, TQueryReadingProgress, TUpdateReadingProgress} from "./reading-progress.model";
import {GlobalError} from "../../lib/errors";

export abstract class ReadingProgressService {
    static async create(data: TCreateReadingProgress, userId: string) {
        const existingProgress = await db.readingProgress.findFirst({
            where: {
                userId,
                surahId: data.surahId,
                ayahNumber: data.ayahNumber,
            },
        });

        if (existingProgress) {
            // Update existing progress with new timestamp
            return db.readingProgress.update({
                where: {
                    id: existingProgress.id
                },
                data: {
                    ...data,
                    timestamp: new Date()
                },
            });
        }

        return db.readingProgress.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    static async update(id: string, data: TUpdateReadingProgress) {
        const progress = await db.readingProgress.findUnique({
            where: {
                id,
            },
        });

        if (!progress) {
            throw new GlobalError("Reading progress not found", 400);
        }

        return db.readingProgress.update({
            where: {
                id,
            },
            data: {
                ...data,
                timestamp: new Date() // Update timestamp when progress is modified
            },
        });
    }

    static async findById(id: string, userId: string, include?: string) {
        const progress = await db.readingProgress.findUnique({
            where: {
                id,
            },
            include: includeRelationsQuery(include),
        });

        if (!progress) {
            throw new GlobalError("Reading progress not found", 400);
        }

        if (progress.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return progress;
    }

    static async findAll(userId: string, query: TQueryReadingProgress) {
        const {include, page = 1, limit = 10, ayahNumber, surahId, juzId, pageNumber} = query;

        const whereClause = {
            ...(userId && {userId}),
            ...(ayahNumber && {ayahNumber}),
            ...(surahId && {surahId}),
            ...(juzId && {juzId}),
            ...(pageNumber && {pageNumber}),
        };

        const data = await db.readingProgress.findMany({
            where: whereClause,
            include: includeRelationsQuery(include),
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                timestamp: 'desc'
            }
        });

        const count = await db.readingProgress.count({
            where: whereClause,
        });

        return {
            data,
            meta: {
                page: page || 1,
                limit: limit || 10,
                total: count,
            }
        };
    }

    static async getLatestProgress(userId: string) {
        return db.readingProgress.findFirst({
            where: {
                userId
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
    }

    static async delete(id: string, userId: string) {
        const progress = await db.readingProgress.findUnique({
            where: {
                id,
            },
        });

        if (!progress) {
            throw new GlobalError("Reading progress not found", 400);
        }

        if (progress.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return db.readingProgress.delete({
            where: {
                id,
            },
        });
    }
}
