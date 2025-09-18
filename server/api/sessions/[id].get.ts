import { defineEventHandler, createError } from "h3";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Session ID is required",
        });
    }

    // TODO: Get user ID from authentication context and verify session ownership
    // For now, assume user has access to the session

    try {
        const session = await prisma.chatSession.findUnique({
            where: {
                id: id,
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });

        if (!session) {
            throw createError({
                statusCode: 404,
                statusMessage: "Session not found",
            });
        }

        return { session };
    } catch (error) {
        if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
            throw error;
        }
        throw createError({
            statusCode: 500,
            statusMessage: `Error fetching session: ${error instanceof Error ? error.message : "Unknown error"
                }`,
        });
    }
});
