<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-300 p-4 flex flex-col">
      <button
        class="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        @click="newChat"
      >
        New Chat
      </button>
      <div class="flex-1 overflow-y-auto">
        <ul>
          <li
            v-for="(session, index) in chatSessions"
            :key="index"
            class="p-2 cursor-pointer hover:bg-gray-200 rounded"
            :class="{
              'bg-gray-300 font-semibold': index === activeSessionIndex,
            }"
            @click="selectSession(index)"
          >
            {{ session.title || "Untitled Chat" }}
          </li>
        </ul>
      </div>
    </aside>

    <!-- Chat Area -->
    <main class="flex-1 flex flex-col">
      <div class="flex-1 p-4 overflow-y-auto space-y-4">
        <div
          v-for="(message, index) in activeSessionMessages"
          :key="index"
          :class="message.isUser ? 'text-right' : 'text-left'"
        >
          <div
            :class="[
              'inline-block px-4 py-2 rounded-lg max-w-xs',
              message.isUser
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-900',
            ]"
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <form
        @submit.prevent="sendMessage"
        class="p-4 border-t border-gray-300 flex items-center space-x-2 bg-white"
      >
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatSession {
  title: string;
  messages: Message[];
}

const chatSessions = ref<ChatSession[]>([
  {
    title: "Chat 1",
    messages: [{ text: "Hello! How can I help you?", isUser: false }],
  },
]);

const activeSessionIndex = ref(0);
const newMessage = ref("");

const activeSessionMessages = computed(() => {
  return chatSessions.value[activeSessionIndex.value]?.messages || [];
});

function newChat() {
  chatSessions.value.push({
    title: `Chat ${chatSessions.value.length + 1}`,
    messages: [],
  });
  activeSessionIndex.value = chatSessions.value.length - 1;
  newMessage.value = "";
}

function selectSession(index: number) {
  activeSessionIndex.value = index;
  newMessage.value = "";
}

function sendMessage() {
  if (!newMessage.value.trim()) return;
  chatSessions.value[activeSessionIndex.value].messages.push({
    text: newMessage.value,
    isUser: true,
  });
  // Simulate AI response
  setTimeout(() => {
    chatSessions.value[activeSessionIndex.value].messages.push({
      text: "This is a simulated AI response.",
      isUser: false,
    });
  }, 1000);
  newMessage.value = "";
}
</script>
