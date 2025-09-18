import { ref, computed } from "vue";

interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    createdAt: string;
}

interface ChatSession {
    id: string;
    title: string;
    createdAt: string;
    messages: Message[];
}

export function useChat() {
    const currentSession = ref<ChatSession | null>(null);
    const messages = ref<Message[]>([]);
    const isLoading = ref(false);

    const sendMessage = async (content: string) => {
        if (!currentSession.value) return;

        isLoading.value = true;

        // Add user message to UI immediately
        const userMessage: Message = {
            id: Date.now().toString(),
            content,
            role: "user",
            createdAt: new Date().toISOString(),
        };
        messages.value.push(userMessage);

        try {
            // Send message to server
            const response = await $fetch("/api/chat", {
                method: "POST",
                body: {
                    sessionId: currentSession.value.id,
                    message: content,
                },
            });

            // Handle streaming response
            const reader = response.getReader();
            let aiContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                aiContent += chunk;

                // Update the last message (AI response) in real-time
                const lastMessage = messages.value[messages.value.length - 1];
                if (lastMessage && lastMessage.role === "assistant") {
                    lastMessage.content = aiContent;
                } else {
                    // Create new AI message
                    const aiMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        content: aiContent,
                        role: "assistant",
                        createdAt: new Date().toISOString(),
                    };
                    messages.value.push(aiMessage);
                }
            }
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            isLoading.value = false;
        }
    };

    const loadSession = async (sessionId: string) => {
        try {
            const response = await $fetch<{ session: ChatSession }>(`/api/sessions/${sessionId}`);
            currentSession.value = response.session;
            messages.value = response.session.messages;
        } catch (error) {
            console.error("Failed to load session", error);
        }
    };

    const createNewSession = async () => {
        try {
            const response = await $fetch<{ session: ChatSession }>("/api/sessions", {
                method: "POST",
                body: { title: "New Chat" },
            });
            currentSession.value = response.session;
            messages.value = [];
            return response.session.id;
        } catch (error) {
            console.error("Failed to create new session", error);
            return null;
        }
    };

    return {
        currentSession: computed(() => currentSession.value),
        messages: computed(() => messages.value),
        isLoading: computed(() => isLoading.value),
        sendMessage,
        loadSession,
        createNewSession,
    };
}
