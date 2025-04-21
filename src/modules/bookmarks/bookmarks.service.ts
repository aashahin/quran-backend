import {db, includeRelationsQuery} from "../../lib/db";
import {TCreateBookmark, TQueryBookmark, TUpdateBookmark} from "./bookmarks.model";
import {GlobalError} from "../../lib/errors";

export abstract class BookmarkService {
    static async create(data: TCreateBookmark, userId: string) {
        const existingBookmark = await db.bookmark.findFirst({
            where: {
                userId,
                surahId: data.surahId,
                ayahNumber: data.ayahNumber,
            },
        });

        if (existingBookmark) {
            return existingBookmark;
        }

        return db.bookmark.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    static async update(id: string, data: TUpdateBookmark) {
        const bookmark = await db.bookmark.findUnique({
            where: {
                id,
            },
        });

        if (!bookmark) {
            throw new GlobalError("Bookmark not found", 400);
        }

        return db.bookmark.update({
            where: {
                id,
            },
            data,
        });
    }

    static async findById(id: string, userId: string, include?: string) {
        const bookmark = await db.bookmark.findUnique({
            where: {
                id,
            },
            include: includeRelationsQuery(include),
        });

        if (!bookmark) {
            throw new GlobalError("Bookmark not found", 400);
        }

        if (bookmark.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return bookmark;
    }

    static async findAll(userId: string, query: TQueryBookmark) {
        const {include, page = 1, limit = 10, ayahNumber, surahId} = query;

        const whereClause = {
            ...(userId && {userId}),
            ...(ayahNumber && {ayahNumber}),
            ...(surahId && {surahId}),
        };

        const data = await db.bookmark.findMany({
            where: whereClause,
            include: includeRelationsQuery(include),
            skip: (page - 1) * limit,
            take: limit,
        });

        const count = await db.bookmark.count({
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
        const bookmark = await db.bookmark.findUnique({
            where: {
                id,
            },
        });

        if (!bookmark) {
            throw new GlobalError("Bookmark not found", 400);
        }

        if (bookmark.userId !== userId) {
            throw new GlobalError("Unauthorized", 401);
        }

        return db.bookmark.delete({
            where: {
                id,
            },
        });
    }
}