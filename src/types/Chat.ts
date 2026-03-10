import type { User } from "./User";

export interface Chat {
    _id: string;
    participants: User[];
    hasUnreadMessages: boolean;
}   