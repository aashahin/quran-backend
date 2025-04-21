import {db, includeRelationsQuery} from "../../lib/db";
import {TCreateMemorizationTest, TQueryMemorizationTest, TUpdateMemorizationTest} from "./memorization-tests.model";
import {GlobalError} from "../../lib/errors";

export abstract class MemorizationTestService {
    static async create(data: TCreateMemorizationTest, userId: string) {
        return db.memorizationTest.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    static async update(id: string, data: TUpdateMemorizationTest, userId: string) {
        const test = await db.memorizationTest.findUnique({
            where: {
                id,
            },
        });

        if (!test) {
            throw new GlobalError("Memorization test not found", 404);
        }

        if (test.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return db.memorizationTest.update({
            where: {
                id,
            },
            data,
        });
    }

    static async findById(id: string, userId: string, include?: string) {
        const test = await db.memorizationTest.findUnique({
            where: {
                id,
            },
            include: includeRelationsQuery(include),
        });

        if (!test) {
            throw new GlobalError("Memorization test not found", 404);
        }

        if (test.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return test;
    }

    static async findAll(userId: string, query: TQueryMemorizationTest) {
        const {include, page = 1, limit = 10, startSurahId, endSurahId} = query;

        const whereClause = {
            userId,
            ...(startSurahId && {startSurahId}),
            ...(endSurahId && {endSurahId}),
        };

        const data = await db.memorizationTest.findMany({
            where: whereClause,
            include: includeRelationsQuery(include),
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const count = await db.memorizationTest.count({
            where: whereClause,
        });

        return {
            data,
            meta: {
                page,
                limit,
                total: count,
            }
        };
    }

    static async delete(id: string, userId: string) {
        const test = await db.memorizationTest.findUnique({
            where: {
                id,
            },
        });

        if (!test) {
            throw new GlobalError("Memorization test not found", 404);
        }

        if (test.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return db.memorizationTest.delete({
            where: {
                id,
            },
        });
    }

    static async complete(id: string, data: TUpdateMemorizationTest, userId: string) {
        const test = await db.memorizationTest.findUnique({
            where: {
                id,
            },
        });

        if (!test) {
            throw new GlobalError("Memorization test not found", 404);
        }

        if (test.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return db.memorizationTest.update({
            where: {
                id,
            },
            data: {
                ...data,
                completedAt: new Date().toISOString(),
            },
        });
    }
}
