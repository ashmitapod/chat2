'use client';

import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { useChat } from '@/hooks/useChat';

export default function Home() {
  const {
    chatState,
    isLoading,
    createNewRoom,
    sendMessage,
    setActiveRoom,
    deleteRoom,
    clearAllChats,
    getCurrentRoom,
  } = useChat();

  // Create a default room on first visit
  useEffect(() => {
    if (chatState.rooms.length === 0) {
      createNewRoom('Welcome Chat');
    }
  }, [chatState.rooms.length, createNewRoom]);

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar
        rooms={chatState.rooms}
        activeRoomId={chatState.activeRoomId}
        onCreateRoom={createNewRoom}
        onSelectRoom={setActiveRoom}
        onDeleteRoom={deleteRoom}
        onClearAllChats={clearAllChats}
      />
      
      <ChatArea
        room={getCurrentRoom()}
        isLoading={isLoading}
        onSendMessage={sendMessage}
      />
    </div>
  );
}
