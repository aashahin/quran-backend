import {t} from 'elysia';

const create = t.Object({
    surahId: t.String(),
    ayahNumber: t.Number(),
    name: t.Optional(t.Nullable(t.String())),
    note: t.Optional(t.Nullable(t.String())),
});

const update = t.Partial(create);

const query = t.Partial(t.Object({
    page: t.Integer({default: 1}),
    limit: t.Integer({default: 10}),
    include: t.String(),
    surahId: t.String(),
    ayahNumber: t.Number(),
}));

export type TCreateBookmark = typeof create.static;
export type TUpdateBookmark = typeof update.static;
export type TQueryBookmark = typeof query.static;

export const BookmarksModel = {
    'bookmarks.create': create,
    'bookmarks.update': update,
    'bookmarks.query': query,
}