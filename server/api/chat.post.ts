import { defineEventHandler, readBody } from "h3";
import { useRuntimeConfig } from "#imports";
import { prisma } from "~/server/utils/prisma";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { sessionId, message } = body;

    if (!sessionId || !message) {
        return {
            statusCode: 400,
            statusMessage: "sessionId and message are required",
        };
    }

    // TODO: Add proper authentication check here
    // For now, assume user is authenticated

    // Save user message to DB
    const userMessage = await prisma.message.create({
        data: {
            content: message,
            role: "user",
            sessionId,
        },
    });

    // Call Gemini LLM via Vercel AI SDK
    const config = useRuntimeConfig();
    const result = await streamText({
        model: google("models/gemini-2.5-pro", {
            apiKey: config.public.googleApiKey,
        }),
        messages: [{ role: "user", content: message }],
    });

    // Stream response back to client and save AI messages
    let aiContent = "";

    return new ReadableStream({
        async start(controller) {
            for await (const delta of result.textStream) {
                aiContent += delta;
                controller.enqueue(new TextEncoder().encode(delta));
            }
            // Save AI message to DB
            await prisma.message.create({
                data: {
                    content: aiContent,
                    role: "assistant",
                    sessionId,
                },
            });
            controller.close();
        },
    });
});
