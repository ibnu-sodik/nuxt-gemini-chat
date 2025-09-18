<script setup lang="ts">
import { useLogtoClient } from "#imports";
import { navigateTo } from "#app";

const logto = useLogtoClient();

import { useRequestURL } from "#app";

const url = useRequestURL();

await logto.handleSignInCallback(url.toString());

// Setelah proses selesai, redirect ke home page
await navigateTo("/");
</script>

<template>
  <p>Processing login...</p>
</template>
