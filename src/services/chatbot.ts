import { Message } from '@/types/chat';

interface ChatContext {
  previousMessages: Message[];
  studentInfo?: {
    name?: string;
    subject?: string;
    level?: string;
  };
}

export class ChatbotService {
  private static fallbackResponses = {
    greetings: [
      "Hello! I'm here to help you with your studies. What would you like to learn about today?",
      "Hi there! I'm your study assistant. How can I help you with your academic work?",
      "Welcome! I'm ready to assist you with any questions or topics you'd like to explore.",
    ],
    general: [
      "That's an interesting question! Can you provide more details so I can give you a better answer?",
      "I'd like to help you with that. Could you elaborate on what you're looking for?",
      "Great question! Let me think about the best way to explain this to you.",
    ],
    error: [
      "I'm having trouble connecting to my AI service right now. Could you try rephrasing your question?",
      "Sorry, I'm experiencing some technical difficulties. Please try again in a moment.",
    ],
  };

  static async generateResponse(userMessage: string, context: ChatContext): Promise<string> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: context.previousMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.response || this.getFallbackResponse(userMessage);
    } catch (error) {
      console.error('Error generating response:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private static getFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // Check for greetings
    if (this.containsWords(message, ['hello', 'hi', 'hey', 'start', 'begin'])) {
      return this.getRandomResponse('greetings');
    }

    // Default response
    return this.getRandomResponse('general');
  }

  private static containsWords(text: string, words: string[]): boolean {
    return words.some(word => text.includes(word));
  }

  private static getRandomResponse(category: keyof typeof ChatbotService.fallbackResponses): string {
    const responses = this.fallbackResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
