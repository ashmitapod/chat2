import { ChatState, ChatRoom, Message } from '@/types/chat';

const STORAGE_KEY = 'student-chatbot-data';

export class LocalStorageManager {
  static getChatState(): ChatState {
    try {
      if (typeof window === 'undefined') {
        return { rooms: [], activeRoomId: null };
      }
      
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return { rooms: [], activeRoomId: null };
      }
      
      const parsed = JSON.parse(stored);
      
      // Convert date strings back to Date objects
      const rooms = parsed.rooms.map((room: ChatRoom & { createdAt: string; lastActivity: string; messages: Array<Message & { timestamp: string }> }) => ({
        ...room,
        createdAt: new Date(room.createdAt),
        lastActivity: new Date(room.lastActivity),
        messages: room.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
      
      return { ...parsed, rooms };
    } catch (error) {
      console.error('Error loading chat state from localStorage:', error);
      return { rooms: [], activeRoomId: null };
    }
  }

  static saveChatState(state: ChatState): void {
    try {
      if (typeof window === 'undefined') return;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving chat state to localStorage:', error);
    }
  }

  static addMessage(roomId: string, message: Message): void {
    const state = this.getChatState();
    const roomIndex = state.rooms.findIndex(room => room.id === roomId);
    
    if (roomIndex !== -1) {
      state.rooms[roomIndex].messages.push(message);
      state.rooms[roomIndex].lastActivity = new Date();
      this.saveChatState(state);
    }
  }

  static createRoom(room: ChatRoom): void {
    const state = this.getChatState();
    state.rooms.push(room);
    state.activeRoomId = room.id;
    this.saveChatState(state);
  }

  static setActiveRoom(roomId: string): void {
    const state = this.getChatState();
    state.activeRoomId = roomId;
    this.saveChatState(state);
  }

  static deleteRoom(roomId: string): void {
    const state = this.getChatState();
    state.rooms = state.rooms.filter(room => room.id !== roomId);
    
    if (state.activeRoomId === roomId) {
      state.activeRoomId = state.rooms.length > 0 ? state.rooms[0].id : null;
    }
    
    this.saveChatState(state);
  }

  static clearAllData(): void {
    try {
      if (typeof window === 'undefined') return;
      
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing chat data:', error);
    }
  }
}
