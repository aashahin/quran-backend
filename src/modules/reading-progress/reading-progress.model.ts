import {t} from 'elysia';

const create = t.Object({
    surahId: t.Number(),
    ayahNumber: t.Number(),
    juzId: t.Optional(t.Nullable(t.Number())),
    pageNumber: t.Optional(t.Nullable(t.Number())),
});

const update = t.Partial(create);

const query = t.Partial(t.Object({
    page: t.Integer({default: 1}),
    limit: t.Integer({default: 10}),
    include: t.String(),
    surahId: t.Number(),
    ayahNumber: t.Number(),
    juzId: t.Number(),
    pageNumber: t.Number(),
}));

export type TCreateReadingProgress = typeof create.static;
export type TUpdateReadingProgress = typeof update.static;
export type TQueryReadingProgress = typeof query.static;

export const ReadingProgressModel = {
    'readingProgress.create': create,
    'readingProgress.update': update,
    'readingProgress.query': query,
}
