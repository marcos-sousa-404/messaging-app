import type { User } from './User';
import type { TimestampedDatabaseEntity } from '@/types/TimestampedDatabaseEntity.ts';

export interface Chat extends TimestampedDatabaseEntity {
  _id: string;
  participants: User[];
  hasUnreadMessages: boolean;
}
