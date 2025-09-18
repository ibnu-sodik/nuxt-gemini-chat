// https://nuxt.com/docs/api/configuration/nuxt-config
import { UserScope } from "@logto/nuxt";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@logto/nuxt"],
  runtimeConfig: {
    logto: {
      endpoint: process.env.NUXT_LOGTO_ENDPOINT, // ex: https://57t30l.logto.app
      appId: process.env.NUXT_LOGTO_APP_ID,
      appSecret: process.env.NUXT_LOGTO_APP_SECRET,
      cookieEncryptionKey: process.env.NUXT_LOGTO_COOKIE_ENCRYPTION_KEY,

      // Setelah login selesai di /callback, redirect user ke halaman utama
      postCallbackRedirectUri: "/chat",

      pathnames: {
        signIn: "/login",   // otomatis /login → Logto
        signOut: "/logout", // otomatis /logout → Logto
        callback: "/callback", // HARUS sama dengan redirect_uri di Logto Console
      },

      scopes: [UserScope.Email, UserScope.Phone, UserScope.Profile],
      fetchUserInfo: true,
    },
    public: {
      logto: {
        endpoint: process.env.NUXT_LOGTO_ENDPOINT,
        appId: process.env.NUXT_LOGTO_APP_ID,
      },
    },
  },
});
