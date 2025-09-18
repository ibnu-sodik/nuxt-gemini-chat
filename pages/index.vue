<script setup lang="ts">
import { useLogtoUser, useLogto } from "#imports";
import { useRouter } from "#imports";

const user = useLogtoUser();
const logto = useLogto();
const router = useRouter();

const handleSignIn = async () => {
  console.log("Signing in...");
  await logto.signInRedirect();
};

const handleSignOut = async () => {
  await logto.signOut();
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
      <div v-if="user">
        <h2 class="text-2xl font-semibold mb-4">
          Welcome, {{ user.name || user.email }}
        </h2>
        <ul class="text-left mb-6">
          <li v-for="(value, key) in user" :key="key" class="mb-1">
            <b>{{ key }}:</b> {{ value }}
          </li>
        </ul>
        <button
          @click="handleSignOut"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sign out
        </button>
      </div>
      <div v-else>
        <h2 class="text-2xl font-semibold mb-6">Please sign in to continue</h2>
        <button
          @click="handleSignIn"
          class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Sign in with Logto
        </button>
      </div>
    </div>
  </div>
</template>
