<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { useLogtoUser } from "#imports";
import { useRouter } from "vue-router";

const user = useLogtoUser();
const router = useRouter();

onMounted(async () => {
  if (user.value) {
    // Save user to DB via API
    await $fetch("/api/user/upsert", {
      method: "POST",
      body: {
        logtoId: user.value.sub,
        email: user.value.email,
      },
    });
    await router.push("/chat");
  } else {
    await router.push("/");
  }
});
</script>
