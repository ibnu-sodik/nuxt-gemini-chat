<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
      <a
        href="/sign-in"
        class="w-full block text-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Login with Logto
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLogtoClient } from "#imports";
import { navigateTo } from "#app/composables/router";

const logto = useLogtoClient();
console.log(logto);

onMounted(async () => {
  if (logto && logto.isAuthenticated) {
    // Get user info
    const userInfo = await logto.getIdTokenClaims();
    // Save user data to DB
    try {
      await $fetch("/api/user/save", {
        method: "POST",
        body: {
          email: userInfo.email,
          logtoId: userInfo.sub,
        },
      });
      // Redirect to /chat
      await navigateTo("/chat");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }
});
</script>
