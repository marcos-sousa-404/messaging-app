import type { User } from '@/types/User.ts';
import type { Chat } from '@/types/Chat.ts';
import type { TimestampedDatabaseEntity } from '@/types/TimestampedDatabaseEntity.ts';

export interface ChatMessage extends TimestampedDatabaseEntity {
  conversationId: string | Chat;
  senderId: User;
  receiverId: User;
  text?: string;
  fileUrl?: string;
  fileType?: string;
  fileName?: string;
}
