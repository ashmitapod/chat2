'use client';

import { useEffect, useRef } from 'react';
import { ChatRoom } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MessageSquare, Loader2 } from 'lucide-react';

interface ChatAreaProps {
  room: ChatRoom | null;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatArea = ({ room, isLoading, onSendMessage }: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [room?.messages]);

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <MessageSquare size={64} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Welcome to Study Chat
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Your AI-powered study assistant is here to help! Create a new chat or select an existing conversation to get started.
          </p>
          <div className="text-sm text-gray-400">
            <p>💡 I can help you with:</p>
            <ul className="mt-2 space-y-1">
              <li>• Math problems and explanations</li>
              <li>• Science concepts and theories</li>
              <li>• Writing and grammar assistance</li>
              <li>• Study tips and homework guidance</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">{room.name}</h2>
        <p className="text-sm text-gray-500">
          {room.messages.length} message{room.messages.length !== 1 ? 's' : ''} • 
          Created {room.createdAt.toLocaleDateString()}
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {room.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Start the conversation
              </h3>
              <p className="text-gray-500">
                Send a message to begin chatting with your study assistant!
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {room.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex gap-3 p-4 bg-gray-50">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-blue-600">
                      Study Assistant
                    </span>
                    <span className="text-xs text-gray-500">typing...</span>
                  </div>
                  <div className="text-gray-500 italic">
                    Thinking about your question...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={onSendMessage}
        disabled={isLoading}
        placeholder="Ask me anything about your studies..."
      />
    </div>
  );
};
