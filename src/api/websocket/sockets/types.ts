export type UserTypingData = {
  isTyping: boolean;
  userName: string;
  userId: string;
};

export type UserStatusData = {
  userId: string;
  isOnline: boolean;
};

export type OnlineUsersData = Record<string, boolean>;
