import type { User } from '@/types/User.ts';
import type { Chat } from '@/types/Chat.ts';

export interface ChatMessage {
  _id: string;
  conversationId: string | Chat;
  senderId: User;
  receiverId: User;
  text: string;
}
