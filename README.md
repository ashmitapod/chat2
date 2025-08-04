# Study Chat - AI Learning Assistant

A Next.js TypeScript chatbot website for students powered by Google's Gemini AI. This application helps students with their studies across various subjects including math, science, writing, and more.

## Features

- 🤖 **AI-Powered Responses**: Uses Google's Gemini AI for intelligent, context-aware responses
- 💾 **Local Storage**: All chat data is stored locally in the browser (no external database required)
- 🏠 **Multiple Chat Rooms**: Create and manage multiple conversation sessions
- 🔄 **Context Persistence**: Chat history and context are maintained across browser sessions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎯 **Student-Focused**: Designed specifically for educational use with appropriate content filtering

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (Gemini)
- **State Management**: React hooks with localStorage
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Generative AI API key

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Get your API key from [Google AI Studio](https://ai.google.dev/)
   - Replace `your_gemini_api_key_here` in `.env.local` with your actual API key:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## How to Use

1. **Start a Conversation**: Click "New Chat" to create a new conversation room
2. **Ask Questions**: Type your academic questions in the chat input
3. **Get Help**: The AI assistant will provide educational guidance and explanations
4. **Multiple Topics**: Switch between different chat rooms for different subjects
5. **Persistent History**: Your conversations are automatically saved locally

## Example Queries

- "Can you help me understand quadratic equations?"
- "What's the difference between mitosis and meiosis?"
- "How do I structure a persuasive essay?"
- "Explain the water cycle to me"
- "I'm stuck on this math problem: 2x + 5 = 15"

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts     # Gemini API integration
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # App layout
│   └── page.tsx             # Main chat interface
├── components/
│   ├── ChatArea.tsx         # Main chat display
│   ├── ChatInput.tsx        # Message input component
│   ├── ChatMessage.tsx      # Individual message display
│   └── Sidebar.tsx          # Chat rooms sidebar
├── hooks/
│   └── useChat.ts           # Chat state management
├── services/
│   └── chatbot.ts           # AI service integration
├── types/
│   └── chat.ts              # TypeScript definitions
└── utils/
    └── localStorage.ts      # Local storage utilities
```

## Troubleshooting

### API Key Issues
- Ensure your Gemini API key is correctly set in `.env.local`
- Check that the environment variable name matches: `GOOGLE_GENERATIVE_AI_API_KEY`
- Restart the development server after changing environment variables

### LocalStorage Problems
- Clear browser cache and localStorage if experiencing data issues
- Use the "Clear All Chats" option to reset the application state

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Google AI Documentation](https://ai.google.dev/docs) - learn about Gemini AI integration
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about utility-first CSS

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
