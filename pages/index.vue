<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">
        Nuxt3 Gemini Chat
      </h1>
      <div class="space-y-4">
        <div class="bg-blue-100 p-4 rounded-lg">
          <p class="text-blue-800">Welcome to the Gemini Chat App!</p>
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Chat logic will be added here
</script>
