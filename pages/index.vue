<template>
  <client-only>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "#app";

const { $logto } = useNuxtApp();

const logto = $logto as any;

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    // Validate with Logto using ROPC
    await logto.signIn(email.value, password.value);

    // Check if authenticated
    if (logto.isAuthenticated) {
      const userInfo = await logto.getIdTokenClaims();

      // Save user data to database
      await $fetch("/api/user/save", {
        method: "POST",
        body: {
          email: userInfo?.email,
          logtoId: userInfo?.sub,
        },
      });

      // Redirect to chat page
      await navigateTo("/chat");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
</script>
