import {Elysia, t} from "elysia";
import {authMiddleware} from "../../lib/auth";
import {BookmarksModel} from "./bookmarks.model";
import {BookmarkService} from "./bookmarks.service";

export const bookmarksController = new Elysia({
    name: "Bookmarks",
    prefix: "/bookmarks",
})
    .use(authMiddleware)
    .model(BookmarksModel)
    .get(
        "/",
        ({user, query}) => {
            return BookmarkService.findAll(user.id, query);
        },
        {
            query: "bookmarks.query",
            auth: true,
        },
    )
    .get(
        "/:id",
        ({user, params, query}) => {
            return BookmarkService.findById(params.id, user.id, query.include);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            query: t.Object({
                include: t.Optional(t.String()),
            }),
            auth: true,
        },
    )
    .post(
        "/",
        ({user, body}) => {
            return BookmarkService.create(body, user.id);
        },
        {
            body: "bookmarks.create",
            auth: true,
        },
    )
    .patch(
        "/:id",
        ({params, body}) => {
            return BookmarkService.update(params.id, body);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            body: "bookmarks.update",
            auth: true,
        },
    )
    .delete(
        "/:id",
        ({user, params}) => {
            return BookmarkService.delete(params.id, user.id);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            auth: true,
        },
    );