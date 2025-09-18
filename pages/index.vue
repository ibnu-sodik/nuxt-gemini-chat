<template>
  <client-only>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <button
          @click="handleLogin"
          class="w-full block text-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login with Logto
        </button>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import LogtoClient from "@logto/browser";
import { navigateTo } from "#app";

const config = useRuntimeConfig();

const logto = new LogtoClient({
  endpoint: config.public.logto.endpoint,
  appId: config.public.logto.appId,
});

const handleLogin = async () => {
  try {
    await logto.signIn({
      redirectUri: "http://localhost:3000/auth/callback",
    });
  } catch (error) {
    console.error("Login error:", error);
  }
};

onMounted(async () => {
  try {
    if (await logto.isAuthenticated()) {
      const userInfo = await logto.getIdTokenClaims();

      await $fetch("/api/user/save", {
        method: "POST",
        body: {
          email: userInfo?.email,
          logtoId: userInfo?.sub,
        },
      });

      await navigateTo("/chat");
    }
  } catch (err) {
    console.error("Auth error:", err);
  }
});
</script>
