// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@logto/nuxt"],
  runtimeConfig: {
    logto: {
      endpoint: process.env.NUXT_LOGTO_ENDPOINT,
      appId: process.env.NUXT_LOGTO_APP_ID,
      appSecret: process.env.NUXT_LOGTO_APP_SECRET,
    },
    public: {
      logto: {
        endpoint: process.env.NUXT_LOGTO_ENDPOINT,
        appId: process.env.NUXT_LOGTO_APP_ID,
      },
    },
  },
});
