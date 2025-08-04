'use client';

import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-3 p-4 ${isBot ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
      }`}>
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-medium ${
            isBot ? 'text-blue-600' : 'text-green-600'
          }`}>
            {isBot ? 'Study Assistant' : 'You'}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="text-gray-800 whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    </div>
  );
};
