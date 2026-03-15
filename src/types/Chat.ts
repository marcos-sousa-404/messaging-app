import type { User } from './User';
import type { TimestampedDatabaseEntity } from '@/types/TimestampedDatabaseEntity.ts';
import type { ChatMessage } from '@/types/ChatMessage.ts';

export interface Chat extends TimestampedDatabaseEntity {
  _id: string;
  participants: User[];
  hasUnreadMessages: boolean;
  lastMessage?: string | ChatMessage;
}
