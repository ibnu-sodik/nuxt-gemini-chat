<template>
  <div>
    <h1>Chat Page</h1>
    <button @click="handleLogout">Logout</button>
    <div v-if="user">
      <p>Welcome, {{ user?.email }}</p>
      <!-- Chat UI here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const { user, fetchUser, logout } = useAuth();
const router = useRouter();

onMounted(async () => {
  await fetchUser();
  if (!user.value) {
    router.push("/login");
  }
});

const handleLogout = async () => {
  await logout();
};
</script>
