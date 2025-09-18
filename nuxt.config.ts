// https://nuxt.com/docs/api/configuration/nuxt-config
import { UserScope } from "@logto/nuxt";

export default defineNuxtConfig({
  compatibilityDate: '2025-09-18',
  css: ['~/assets/css/tailwind.css'],
  modules: [
    "@nuxtjs/tailwindcss",
    "@logto/nuxt",
    // "shadcn-vue/nuxt"
  ],
  runtimeConfig: {
    logto: {
      endpoint: process.env.NUXT_LOGTO_ENDPOINT, // ex: https://57t30l.logto.app
      appId: process.env.NUXT_LOGTO_APP_ID,
      appSecret: process.env.NUXT_LOGTO_APP_SECRET,
      cookieEncryptionKey: process.env.NUXT_LOGTO_COOKIE_ENCRYPTION_KEY,

      // Setelah login selesai di /callback, redirect user ke halaman utama
      postCallbackRedirectUri: "/chat",

      pathnames: {
        signIn: "/login",
        signOut: "/logout",
        callback: "/callback",
      },

      scopes: ["openid", "profile", "email"],
      fetchUserInfo: true,
    },
    public: {
      logto: {
        endpoint: process.env.NUXT_LOGTO_ENDPOINT,
        appId: process.env.NUXT_LOGTO_APP_ID,
      },
      googleApiKey: process.env.GEMINI_API_KEY,
    },
    databaseUrl: process.env.DATABASE_URL,
  },
});
