import {t} from 'elysia';

const create = t.Object({
    key: t.String(),
    value: t.Optional(t.Nullable(t.String())),
    metadata: t.Optional(t.Nullable(t.String())),
});

const update = t.Partial(create);

const query = t.Partial(t.Object({
    page: t.Integer({default: 1}),
    limit: t.Integer({default: 10}),
    include: t.String(),
    key: t.Optional(t.String()),
}));

export type TCreateUserSetting = typeof create.static;
export type TUpdateUserSetting = typeof update.static;
export type TQueryUserSetting = typeof query.static;

export const UserSettingsModel = {
    'userSettings.create': create,
    'userSettings.update': update,
    'userSettings.query': query,
}
