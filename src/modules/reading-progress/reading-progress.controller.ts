import {Elysia, t} from "elysia";
import {authMiddleware} from "../../lib/auth";
import {ReadingProgressModel} from "./reading-progress.model";
import {ReadingProgressService} from "./reading-progress.service";

export const readingProgressController = new Elysia({
    name: "ReadingProgress",
    prefix: "/reading-progress",
})
    .use(authMiddleware)
    .model(ReadingProgressModel)
    .get(
        "/",
        ({user, query}) => {
            return ReadingProgressService.findAll(user.id, query);
        },
        {
            query: "readingProgress.query",
            auth: true,
        },
    )
    .get(
        "/latest",
        ({user}) => {
            return ReadingProgressService.getLatestProgress(user.id);
        },
        {
            auth: true,
        },
    )
    .get(
        "/:id",
        ({user, params, query}) => {
            return ReadingProgressService.findById(params.id, user.id, query.include);
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
            return ReadingProgressService.create(body, user.id);
        },
        {
            body: "readingProgress.create",
            auth: true,
        },
    )
    .patch(
        "/:id",
        ({params, body}) => {
            return ReadingProgressService.update(params.id, body);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            body: "readingProgress.update",
            auth: true,
        },
    )
    .delete(
        "/:id",
        ({user, params}) => {
            return ReadingProgressService.delete(params.id, user.id);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            auth: true,
        },
    );
