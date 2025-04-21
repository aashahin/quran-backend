import { Elysia } from "elysia";
import { betterAuth, Session, User } from "better-auth";
import {PrismaClient, UserRole} from "@prisma/client";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
    admin,
} from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
    onAPIError: {
        throw: true,
        onError: (error, _ctx) => {
            console.log("API Error in Auth", error);
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    plugins: [
        admin({
            defaultRole: "user",
        }),
    ],
});

type TUser = User & {
    role: UserRole;
};

export const authMiddleware = new Elysia({ name: "better-auth" }).macro({
    auth: (
        roles: UserRole[] | boolean,
    ): {
        resolve: (context: any) => Promise<{ user: TUser; session: Session }>;
    } => {
        if (!roles) return undefined as any;

        return {
            async resolve({ error, request: { headers } }) {
                const session = await auth.api.getSession({
                    headers,
                });

                if (!session) return error(401);

                const role = session.user.role;

                if (!role) return error(403);

                const isAllowed =
                    typeof roles === "boolean"
                        ? roles
                        : roles.includes((role as UserRole) || "all");

                if (!isAllowed) return error(403);

                return {
                    user: session.user,
                    session: session.session,
                };
            },
        };
    },
});
