/* This file is no longer needed as @logto/nuxt module handles auth routes and callbacks */
export default defineEventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: "Not Found",
  });
});
