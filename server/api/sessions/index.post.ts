import { defineEventHandler, readBody } from "h3";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { title } = body;

    // TODO: Get user ID from authentication context
    // For now, assume user ID is provided or use a placeholder
    const userId = "placeholder-user-id"; // Replace with actual user ID from auth

    try {
        const session = await prisma.chatSession.create({
            data: {
                title: title || "New Chat",
                userId: userId,
            },
        });

        return { session };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Error creating session: ${error instanceof Error ? error.message : "Unknown error"
                }`,
        });
    }
});
