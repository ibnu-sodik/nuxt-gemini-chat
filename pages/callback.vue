<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <p class="text-lg">Redirecting...</p>
  </div>
</template>

<script setup lang="ts">
import { useLogto } from "#imports";
import { onMounted } from "#imports";

const logto = useLogto();

onMounted(async () => {
  try {
    await logto.handleSignInCallback(window.location.href);
    // Redirect to chat page after successful callback
    await navigateTo("/chat");
  } catch (error) {
    console.error("Callback error:", error);
    // Redirect to home on error
    await navigateTo("/");
  }
});
</script>
