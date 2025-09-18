import { defineEventHandler } from "h3";
// import { useLogto } from "@logto/nuxt/server";
// import { useLogto } from "#imports";
import { useLogto } from '~/composables/useLogto'


export default defineEventHandler(async (event) => {
    // Lindungi semua route /chat dan /api kecuali /login, /callback
    const url = event.node.req.url || "";
    if (
        url.startsWith("/chat") ||
        url.startsWith("/api")
    ) {
        const logto = useLogto(event);
        const isAuth = await logto.isAuthenticated();
        if (!isAuth) {
            throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }
    }
});