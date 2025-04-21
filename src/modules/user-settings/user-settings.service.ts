import {db, includeRelationsQuery} from "../../lib/db";
import {TCreateUserSetting, TQueryUserSetting, TUpdateUserSetting} from "./user-settings.model";
import {GlobalError} from "../../lib/errors";

export abstract class UserSettingService {
    static async create(data: TCreateUserSetting, userId: string) {
        // Check if setting with this key already exists for this user
        const existingSetting = await db.userSetting.findFirst({
            where: {
                userId,
                key: data.key,
            },
        });

        if (existingSetting) {
            // Update the existing setting instead
            return db.userSetting.update({
                where: {
                    id: existingSetting.id,
                },
                data: {
                    value: data.value,
                    metadata: data.metadata,
                    lastUpdated: new Date(),
                },
            });
        }

        return db.userSetting.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    static async update(id: string, data: TUpdateUserSetting, userId: string) {
        const setting = await db.userSetting.findUnique({
            where: {
                id,
            },
        });

        if (!setting) {
            throw new GlobalError("User setting not found", 400);
        }

        if (setting.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return db.userSetting.update({
            where: {
                id,
            },
            data: {
                ...data,
                lastUpdated: new Date(),
            },
        });
    }

    static async findByKey(key: string, userId: string, include?: string) {
        const setting = await db.userSetting.findFirst({
            where: {
                userId,
                key,
            },
            include: includeRelationsQuery(include),
        });

        if (!setting) {
            throw new GlobalError("User setting not found", 400);
        }

        return setting;
    }

    static async findAll(userId: string, query: TQueryUserSetting) {
        const {include, page = 1, limit = 10, key} = query;

        const whereClause = {
            userId,
            ...(key && {key}),
        };

        const data = await db.userSetting.findMany({
            where: whereClause,
            include: includeRelationsQuery(include),
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                lastUpdated: 'desc',
            },
        });

        const count = await db.userSetting.count({
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

    static async delete(id: string, userId: string) {
        const setting = await db.userSetting.findUnique({
            where: {
                id,
            },
        });

        if (!setting) {
            throw new GlobalError("User setting not found", 400);
        }

        if (setting.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return db.userSetting.delete({
            where: {
                id,
            },
        });
    }
}
