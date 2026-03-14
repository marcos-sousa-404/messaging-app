import type { TimestampedDatabaseEntity } from '@/types/TimestampedDatabaseEntity.ts';

export interface User extends TimestampedDatabaseEntity {
  name: string;
  email: string;
  image: string;
}
