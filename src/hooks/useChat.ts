'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatState, ChatRoom, Message } from '@/types/chat';
import { LocalStorageManager } from '@/utils/localStorage';
import { ChatbotService } from '@/services/chatbot';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({ rooms: [], activeRoomId: null });
  const [isLoading, setIsLoading] = useState(false);

  // Load chat state from localStorage on mount
  useEffect(() => {
    const loadedState = LocalStorageManager.getChatState();
    setChatState(loadedState);
  }, []);

  const createNewRoom = (name?: string) => {
    const roomId = uuidv4();
    const roomName = name || `Chat ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    
    const newRoom: ChatRoom = {
      id: roomId,
      name: roomName,
      messages: [],
      createdAt: new Date(),
      lastActivity: new Date(),
    };

    LocalStorageManager.createRoom(newRoom);
    setChatState(LocalStorageManager.getChatState());
    
    return roomId;
  };

  const sendMessage = async (content: string, roomId?: string) => {
    const targetRoomId = roomId || chatState.activeRoomId;
    if (!targetRoomId) return;

    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    LocalStorageManager.addMessage(targetRoomId, userMessage);
    setChatState(LocalStorageManager.getChatState());

    try {
      // Get current room for context
      const currentState = LocalStorageManager.getChatState();
      const currentRoom = currentState.rooms.find(room => room.id === targetRoomId);
      
      if (currentRoom) {
        // Generate bot response
        const botResponse = await ChatbotService.generateResponse(content, {
          previousMessages: currentRoom.messages,
        });

        // Add bot message
        const botMessage: Message = {
          id: uuidv4(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };

        LocalStorageManager.addMessage(targetRoomId, botMessage);
        setChatState(LocalStorageManager.getChatState());
      }
    } catch (error) {
      console.error('Error generating bot response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
      };

      LocalStorageManager.addMessage(targetRoomId, errorMessage);
      setChatState(LocalStorageManager.getChatState());
    } finally {
      setIsLoading(false);
    }
  };

  const setActiveRoom = (roomId: string) => {
    LocalStorageManager.setActiveRoom(roomId);
    setChatState(LocalStorageManager.getChatState());
  };

  const deleteRoom = (roomId: string) => {
    LocalStorageManager.deleteRoom(roomId);
    setChatState(LocalStorageManager.getChatState());
  };

  const clearAllChats = () => {
    LocalStorageManager.clearAllData();
    setChatState({ rooms: [], activeRoomId: null });
  };

  const getCurrentRoom = () => {
    if (!chatState.activeRoomId) return null;
    return chatState.rooms.find(room => room.id === chatState.activeRoomId) || null;
  };

  return {
    chatState,
    isLoading,
    createNewRoom,
    sendMessage,
    setActiveRoom,
    deleteRoom,
    clearAllChats,
    getCurrentRoom,
  };
};
