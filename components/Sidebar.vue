<template>
  <aside class="sidebar">
    <Button @click="createNewSession">New Chat</Button>
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
import { Button } from "shadcn-vue";
import { ref, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

const props = defineProps<{ activeSessionId?: string }>();
const emit = defineEmits<{
  sessionSelected: [id: string];
  newSessionCreated: [id: string];
}>();
const sessions = ref([]);

const fetchSessions = async () => {
  // Fetch dari API
  const { user } = useAuth();
  const res = await $fetch("/api/sessions");
  sessions.value = res.sessions;
};

const selectSession = (id: string) => emit("sessionSelected", id);
const createNewSession = async () => {
  const res = await $fetch("/api/sessions", { method: "POST" });
  emit("newSessionCreated", res.session.id);
};

onMounted(fetchSessions);
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
