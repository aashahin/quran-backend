import {t} from 'elysia';

const create = t.Object({
    startSurahId: t.String(),
    startAyahNumber: t.Number(),
    endSurahId: t.String(),
    endAyahNumber: t.Number(),
    score: t.Optional(t.Nullable(t.Number())),
    mistakes: t.Optional(t.Nullable(t.Number())),
    duration: t.Optional(t.Nullable(t.Number())),
});

const update = t.Partial(create);

const query = t.Partial(t.Object({
    page: t.Integer({default: 1}),
    limit: t.Integer({default: 10}),
    include: t.String(),
    startSurahId: t.String(),
    endSurahId: t.String(),
}));

export type TCreateMemorizationTest = typeof create.static;
export type TUpdateMemorizationTest = typeof update.static;
export type TQueryMemorizationTest = typeof query.static;

export const MemorizationTestsModel = {
    'memorization-tests.create': create,
    'memorization-tests.update': update,
    'memorization-tests.query': query,
}
