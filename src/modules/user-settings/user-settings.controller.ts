import {Elysia, t} from "elysia";
import {authMiddleware} from "../../lib/auth";
import {UserSettingsModel} from "./user-settings.model";
import {UserSettingService} from "./user-settings.service";

export const userSettingsController = new Elysia({
    name: "UserSettings",
    prefix: "/user-settings",
})
    .use(authMiddleware)
    .model(UserSettingsModel)
    .get(
        "/",
        ({user, query}) => {
            return UserSettingService.findAll(user.id, query);
        },
        {
            query: "userSettings.query",
            auth: true,
        },
    )
    .get(
        "/:key",
        ({user, params, query}) => {
            return UserSettingService.findByKey(params.key, user.id, query.include);
        },
        {
            params: t.Object({
                key: t.String(),
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
            return UserSettingService.create(body, user.id);
        },
        {
            body: "userSettings.create",
            auth: true,
        },
    )
    .patch(
        "/:id",
        ({user, params, body}) => {
            return UserSettingService.update(params.id, body, user.id);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            body: "userSettings.update",
            auth: true,
        },
    )
    .delete(
        "/:id",
        ({user, params}) => {
            return UserSettingService.delete(params.id, user.id);
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            auth: true,
        },
    );
