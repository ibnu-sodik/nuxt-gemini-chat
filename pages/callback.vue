<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <p class="text-lg">Redirecting...</p>
  </div>
</template>

<script setup lang="ts">
import { useLogto } from "#imports";
import { onMounted } from "vue";

const logto = useLogto();

onMounted(async () => {
  try {
    await logto.handleSignInCallback();
    await navigateTo("/chat");
  } catch (error) {
    console.error("Callback error:", error);
    await navigateTo("/");
  }
});
</script>
