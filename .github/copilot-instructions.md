<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Chatbot Website Project Instructions

This is a Next.js TypeScript chatbot website for students with the following specifications:

## Project Structure
- Built with Next.js 15, TypeScript, and Tailwind CSS
- Uses App Router for navigation
- Implements local cache (localStorage) instead of database
- Creates new chat rooms for each conversation
- Persists chat context across page reloads

## Key Features
1. **Local Storage Implementation**: All chat data is stored in browser localStorage
2. **Chat Room Management**: Each conversation gets a unique room ID
3. **Context Persistence**: Chat history and context are maintained across sessions
4. **Student-Focused UI**: Clean, intuitive interface suitable for educational use

## Technology Stack
- Framework: Next.js 15 with App Router
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: React hooks with localStorage
- No external database dependencies

## Code Guidelines
- Use TypeScript for all components and utilities
- Implement proper error handling for localStorage operations
- Create reusable components for chat interface
- Follow Next.js App Router conventions
- Use Tailwind CSS for responsive design
