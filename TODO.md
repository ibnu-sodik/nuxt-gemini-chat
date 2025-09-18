# TODO: Full Stack Gemini Chatbot Implementation

- [x] Create server API routes:
  - [x] POST /api/chat: handle chat messages, save user messages, call Gemini via Vercel AI SDK, stream response, save AI messages.
  - [x] GET /api/sessions: fetch all chat sessions for logged-in user.
  - [x] POST /api/sessions: create new chat session.
  - [x] GET /api/sessions/[id]: fetch messages for a chat session.

- [x] Update frontend:
  - [x] pages/chat/index.vue: main chat page with sidebar and chat area.
  - [x] components/Sidebar.vue: list chat sessions.
  - [x] components/ChatBubble.vue: display messages.
  - [x] composables/useChat.ts: manage chat state and interaction with server.

- [ ] Integrate authentication checks to protect chat pages.

- [ ] Use Prisma for database operations.

- [ ] Use environment variables for API keys and secrets.

- [ ] Implement streaming response handling with Vercel AI SDK useChat hook.
