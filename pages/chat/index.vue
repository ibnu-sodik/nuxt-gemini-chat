<template>
  <div class="chat-page">
    <Sidebar
      :active-session-id="currentSession?.id"
      @session-selected="handleSessionSelected"
      @new-session-created="handleNewSessionCreated"
    />
    <div class="chat-area">
      <header class="chat-header">
        <h1>{{ currentSession?.title || "New Chat" }}</h1>
        <button @click="handleLogout" class="logout-button">Logout</button>
      </header>
      <div class="messages-container" ref="messagesContainer">
        <ChatBubble
          v-for="message in messages"
          :key="message.id"
          :content="message.content"
          :role="message.role"
          :created-at="message.createdAt"
        />
        <div v-if="isLoading" class="loading-indicator">AI is typing...</div>
      </div>
      <div class="input-area">
        <form @submit.prevent="handleSendMessage" class="message-form">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            :disabled="isLoading"
            class="message-input"
          />
          <button
            type="submit"
            :disabled="isLoading || !newMessage.trim()"
            class="send-button"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";
import { useChat } from "~/composables/useChat";

const { user, fetchUser, logout } = useAuth();
const {
  currentSession,
  messages,
  isLoading,
  sendMessage,
  loadSession,
  createNewSession,
} = useChat();
const router = useRouter();
const newMessage = ref("");
const messagesContainer = ref<HTMLElement>();

onMounted(async () => {
  await fetchUser();
  if (!user.value) {
    router.push("/");
    return;
  }

  // Create a new session if none exists
  if (!currentSession.value) {
    await createNewSession();
  }
});

const handleSessionSelected = async (sessionId: string) => {
  await loadSession(sessionId);
  scrollToBottom();
};

const handleNewSessionCreated = async (sessionId: string) => {
  await loadSession(sessionId);
  scrollToBottom();
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return;

  const message = newMessage.value.trim();
  newMessage.value = "";

  await sendMessage(message);
  await nextTick();
  scrollToBottom();
};

const handleLogout = async () => {
  await logout();
  router.push("/");
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
</script>

<style scoped>
.chat-page {
  display: flex;
  height: 100vh;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.input-area {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}

.message-form {
  display: flex;
  gap: 0.5rem;
}

.message-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.send-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.send-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.loading-indicator {
  padding: 0.5rem;
  color: #6b7280;
  font-style: italic;
}
</style>
