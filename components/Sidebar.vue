<template>
  <aside class="sidebar">
    <button @click="createNewSession" class="new-chat-button">New Chat</button>
    <ul class="session-list">
      <li
        v-for="session in sessions"
        :key="session.id"
        :class="{ active: session.id === activeSessionId }"
        @click="selectSession(session.id)"
      >
        {{ session.title }}
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
}

const props = defineProps<{
  activeSessionId?: string;
}>();

const emit = defineEmits<{
  sessionSelected: [id: string];
  newSessionCreated: [id: string];
}>();

const sessions = ref<ChatSession[]>([]);

const fetchSessions = async () => {
  try {
    const response = await $fetch<{ sessions: ChatSession[] }>("/api/sessions");
    sessions.value = response.sessions;
  } catch (error) {
    console.error("Failed to fetch sessions", error);
  }
};

const selectSession = (id: string) => {
  emit("sessionSelected", id);
};

const createNewSession = async () => {
  try {
    const response = await $fetch<{ session: ChatSession }>("/api/sessions", {
      method: "POST",
      body: { title: "New Chat" },
    });
    sessions.value.unshift(response.session);
    emit("newSessionCreated", response.session.id);
  } catch (error) {
    console.error("Failed to create new session", error);
  }
};

onMounted(() => {
  fetchSessions();
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;
}

.new-chat-button {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
}

.session-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.session-list li {
  padding: 0.5rem;
  cursor: pointer;
}

.session-list li.active {
  background-color: #2563eb;
  color: white;
}
</style>
