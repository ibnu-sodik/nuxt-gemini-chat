import { createError } from "h3";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async () => {
  try {
    // Test query to check connection
    const userCount = await prisma.user.count();
    return { message: "Koneksi NeonDB berhasil", userCount };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error koneksi DB: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });
  }
});
