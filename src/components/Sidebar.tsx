'use client';

import { ChatRoom } from '@/types/chat';
import { Plus, MessageSquare, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  onCreateRoom: () => void;
  onSelectRoom: (roomId: string) => void;
  onDeleteRoom: (roomId: string) => void;
  onClearAllChats: () => void;
}

export const Sidebar = ({
  rooms,
  activeRoomId,
  onCreateRoom,
  onSelectRoom,
  onDeleteRoom,
  onClearAllChats
}: SidebarProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatLastActivity = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getLastMessage = (room: ChatRoom) => {
    if (room.messages.length === 0) return 'No messages yet';
    const lastMessage = room.messages[room.messages.length - 1];
    const preview = lastMessage.content.substring(0, 50);
    return preview.length < lastMessage.content.length ? `${preview}...` : preview;
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Study Chat</h1>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical size={18} />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    onClearAllChats();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Clear All Chats
                </button>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={onCreateRoom}
          className="w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Chat Rooms List */}
      <div className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-2 text-gray-300" />
            <p>No chats yet</p>
            <p className="text-sm">Start a new conversation!</p>
          </div>
        ) : (
          <div className="p-2">
            {rooms
              .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
              .map((room) => (
                <div
                  key={room.id}
                  onClick={() => onSelectRoom(room.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 group ${
                    activeRoomId === room.id
                      ? 'bg-blue-100 border border-blue-200'
                      : 'hover:bg-white border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {getLastMessage(room)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatLastActivity(room.lastActivity)}
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRoom(room.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500 text-center">
          All chats are stored locally in your browser
        </p>
      </div>
    </div>
  );
};
