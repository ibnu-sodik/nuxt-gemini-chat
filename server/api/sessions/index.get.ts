import { defineEventHandler } from "h3";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
    // TODO: Get user ID from authentication context
    // For now, assume user ID is provided or use a placeholder
    const userId = "placeholder-user-id"; // Replace with actual user ID from auth

    try {
        const sessions = await prisma.chatSession.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return { sessions };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Error fetching sessions: ${error instanceof Error ? error.message : "Unknown error"
                }`,
        });
    }
});
