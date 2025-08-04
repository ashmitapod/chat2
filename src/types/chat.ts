export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  lastActivity: Date;
}

export interface ChatState {
  rooms: ChatRoom[];
  activeRoomId: string | null;
}
