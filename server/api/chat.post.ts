// ~/server/api/chat.post.ts
import { defineEventHandler, readBody, createError } from "h3";
import { prisma } from "~/server/utils/prisma";
import { streamText } from "ai"; // ganti dari vercel-ai
import { google } from "@ai-sdk/google";
import { useLogto } from "~/composables/useLogto";

export default defineEventHandler(async (event) => {
    // 🔐 Auth check pakai Logto
    const logto = useLogto(event);
    const isAuth = await logto.isAuthenticated();
    if (!isAuth) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const claims = await logto.getIdTokenClaims();

    // 📩 Ambil body request
    const body = await readBody<{ sessionId: string; message: string }>(event);
    const { sessionId, message } = body;

    // 💾 Simpan pesan user ke database
    await prisma.message.create({
        data: {
            content: message,
            role: "user",
            sessionId,
        },
    });

    // 🤖 Streaming Gemini
    const config = useRuntimeConfig(event); // ✅ ambil dari event, bukan #imports
    let aiContent = "";

    const stream = await streamText({
        model: google("models/gemini-2.5-pro", {
            apiKey: config.public.googleApiKey, // pastikan ada di nuxt.config.ts
        }),
        messages: [{ role: "user", content: message }],
        onToken: (token) => {
            aiContent += token;
        },
        onFinish: async () => {
            // 💾 Simpan jawaban AI
            await prisma.message.create({
                data: {
                    content: aiContent,
                    role: "assistant",
                    sessionId,
                },
            });
        },
    });

    return stream;
});
