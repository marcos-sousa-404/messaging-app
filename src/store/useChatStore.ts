import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand/react';
import type { Chat } from '@/types/Chat.ts';

interface ChatStore {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
}

const chatStoreStore = createStore<ChatStore>()((set) => ({
  selectedChat: null,
  setSelectedChat: (selectedChat: ChatStore['selectedChat']) => set({ selectedChat }),
}));

const useChatStore = () => useStore(chatStoreStore);

export default useChatStore;
