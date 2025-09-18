<template>
  <div :class="['chat-bubble', role]">
    <div class="message-content">
      {{ content }}
    </div>
    <div class="message-time">
      {{ formatTime(createdAt) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Props {
  content: string;
  role: "user" | "assistant";
  createdAt: string;
}

const props = defineProps<Props>();

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
</script>

<style scoped>
.chat-bubble {
  max-width: 70%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  word-wrap: break-word;
}

.chat-bubble.user {
  align-self: flex-end;
  background-color: #3b82f6;
  color: white;
  margin-left: auto;
}

.chat-bubble.assistant {
  align-self: flex-start;
  background-color: #f3f4f6;
  color: #374151;
  margin-right: auto;
}

.message-content {
  margin-bottom: 0.25rem;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
