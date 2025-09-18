import { prisma } from "~/server/utils/prisma";
// import { useLogto } from "#imports";
import { useLogto } from '~/composables/useLogto'


export default defineEventHandler(async (event) => {
    const logto = useLogto(event);
    await logto.handleSignInCallback();

    const claims = await logto.getIdTokenClaims();
    if (!claims?.sub || !claims?.email) {
        throw createError({ statusCode: 400, statusMessage: "Invalid Logto claims" });
    }

    // Sinkronisasi user ke DB
    await prisma.user.upsert({
        where: { logtoId: claims.sub },
        update: { email: claims.email },
        create: { logtoId: claims.sub, email: claims.email },
    });

    return { success: true };
});