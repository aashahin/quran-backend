export class GlobalError extends Error {
    constructor(
        message: string,
        public code: number | string,
    ) {
        super(message);
        this.name = code.toString();
    }
}

export const ErrorCodes = {
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    BAD_REQUEST: "BAD_REQUEST",
    CONFLICT: "CONFLICT",
    UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    PAYMENT_REQUIRED: "PAYMENT_REQUIRED",
    OK: "OK",
};

export const globalErrors = (
    {
        code,
        error,
        set,
    }: {
        code: string | number;
        error: any;
        set: Record<string, any>;
    }) => {
    if (error?.message === "API Error: INTERNAL_SERVER_ERROR Failed to get session") {
        set.status = 401;
        return {
            status: 401,
            message: "Unauthorized",
            body: {
                message: "Unauthorized",
            },
        };
    }

    if (typeof code === "number") {
        switch (code) {
            case 404:
                code = ErrorCodes.NOT_FOUND;
                break;
            case 401:
                code = ErrorCodes.UNAUTHORIZED;
                break;
            case 403:
                code = ErrorCodes.FORBIDDEN;
                break;
            case 400:
                code = ErrorCodes.BAD_REQUEST;
                break;
            case 409:
                code = ErrorCodes.CONFLICT;
                break;
            case 422:
                code = ErrorCodes.UNPROCESSABLE_ENTITY;
                break;
            case 500:
                code = ErrorCodes.INTERNAL_SERVER_ERROR;
                break;
            case 402:
                code = ErrorCodes.PAYMENT_REQUIRED;
                break;
            case 200:
                code = ErrorCodes.OK;
                break;
            default:
                code = ErrorCodes.INTERNAL_SERVER_ERROR;
        }
    }

    switch (code) {
        // Prisma errors
        case "P2025":
            set.status = 404;
            return {
                status: 404,
                message: "Not Found",
                body: {
                    message: error.message,
                },
            };
        case "P2003": // If body is not valid
            set.status = 422;
            return {
                status: 422,
                message: "Unprocessable Entity",
                body: {
                    message: error.message,
                },
            };
        case "P2002": // If record don't take more than one (unique) value
            set.status = 400;
            return {
                status: 400,
                message: "Bad Request",
                body: {
                    message: error.message,
                },
            };

        // General errors
        case ErrorCodes.NOT_FOUND:
            set.status = 404;
            return {
                status: 404,
                message: "Not Found",
                body: {
                    message: error.message,
                },
            };
        case ErrorCodes.UNAUTHORIZED:
            set.status = 401;
            return {
                status: 401,
                message: "Unauthorized",
                body: {
                    message: error.message,
                },
            };
        case ErrorCodes.FORBIDDEN:
            set.status = 403;
            return {
                status: 403,
                message: "Forbidden",
                body: {
                    message: error.message,
                },
            };
        case ErrorCodes.BAD_REQUEST:
            set.status = 400;
            return {
                status: 400,
                message: "Bad Request",
                body: {
                    message: error.message,
                },
            };
        case ErrorCodes.CONFLICT:
            set.status = 409;
            return {
                status: 409,
                message: "Conflict",
                body: {
                    message: error.message,
                },
            };
        case ErrorCodes.UNPROCESSABLE_ENTITY:
            set.status = 422;
            return {
                status: 422,
                message: "Unprocessable Entity",
                body: {
                    message: error.message,
                },
            };
        case ErrorCodes.INTERNAL_SERVER_ERROR:
            set.status = 500;
            return {
                status: 500,
                message: "Internal Server Error",
                body: {
                    message: error.message,
                },
            };
        case ErrorCodes.PAYMENT_REQUIRED:
            set.status = 402;
            return {
                status: 402,
                message: "Payment Required",
                body: {
                    message: error.message,
                },
            };
        case ErrorCodes.OK:
            set.status = 200;
            return {
                status: 200,
                message: "OK",
                body: {
                    message: error.message,
                },
            };
    }
};
