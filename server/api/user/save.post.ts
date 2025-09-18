import { createError } from "h3";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, logtoId } = body;

  if (!email || !logtoId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and logtoId are required",
    });
  }

  try {
    const user = await prisma.user.upsert({
      where: { logtoId },
      update: { email },
      create: { email, logtoId },
    });
    return { success: true, user };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error saving user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });
  }
});
