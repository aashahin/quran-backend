import {Elysia, t} from "elysia";
import {authMiddleware} from "../../lib/auth";
import {MemorizationTestsModel} from "./memorization-tests.model";
import {MemorizationTestService} from "./memorization-tests.service";

export const memorizationTestsController = new Elysia({
    name: "MemorizationTests",
    prefix: "/memorization-tests",
})
    .use(authMiddleware)
    .model(MemorizationTestsModel)
    .get(
        "/",
        ({user, query}) => {
            return MemorizationTestService.findAll(user.id, query);
        },
        {
            query: "memorization-tests.query",
            auth: true,
        },
    )
    .get(
        "/:id",
        ({user, params, query}) => {
            return MemorizationTestService.findById(params.id, user.id, query.include);
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
            return MemorizationTestService.create(body, user.id);
        },
        {
            body: "memorization-tests.create",
            auth: true,
        },
    )
    .patch(
        "/:id",
        ({user, params, body}) => {
            return MemorizationTestService.update(params.id, body, user.id);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            body: "memorization-tests.update",
            auth: true,
        },
    )
    .delete(
        "/:id",
        ({user, params}) => {
            return MemorizationTestService.delete(params.id, user.id);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            auth: true,
        },
    )
    .patch(
        "/:id/complete",
        ({user, params, body}) => {
            return MemorizationTestService.complete(params.id, body, user.id);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            body: "memorization-tests.update",
            auth: true,
        },
    );
