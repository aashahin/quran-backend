import {Elysia} from "elysia";
import {auth} from "./lib/auth";
import {globalErrors} from "./lib/errors";
import cors from "@elysiajs/cors";
import {bookmarksController} from "./modules/bookmarks/bookmarks.controller";
import {memorizationTestsController} from "./modules/memorization-tests/memorization-tests.controller";
import {userSettingsController} from "./modules/user-settings/user-settings.controller";
import {readingProgressController} from "./modules/reading-progress/reading-progress.controller";

const app = new Elysia()
    .onError(globalErrors)
    .use(
        cors({
            origin: true,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS",],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"],
        }),
    )
    .mount(auth.handler)
    .use(bookmarksController)
    .use(memorizationTestsController)
    .use(userSettingsController)
    .use(readingProgressController)
    .listen({
        port: Number(process.env.PORT) || 3000,
        idleTimeout: 0
    });

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
