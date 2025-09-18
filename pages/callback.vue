<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <p class="text-lg font-medium text-gray-800">Processing login...</p>
      <div class="mt-4">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogto } from "~/composables/useLogto";
import { navigateTo } from "#app";

const logto = useLogto();

onMounted(async () => {
  try {
    await logto.handleSignInCallback(window.location.href);
    // After successful callback, redirect to chat
    await navigateTo("/chat");
  } catch (error) {
    console.error("Callback error:", error);
    // Redirect to login on error
    await navigateTo("/");
  }
});
</script>
