import { getSocket } from '../socket';
import type { UserStatusData, UserTypingData } from '@/api/websocket/sockets/types.ts';
import type { ChatMessage } from '@/types/ChatMessage.ts';

export const emitJoinChat = (conversationId: string) => {
  getSocket().emit('join_chat', conversationId);
};

export const emitTypingStart = (conversationId: string) => {
  getSocket().emit('typing_start', conversationId);
};

export const emitTypingStop = (conversationId: string) => {
  getSocket().emit('typing_stop', conversationId);
};

export const emitConnected = (conversationId: string) => {
  getSocket().emit('connected', conversationId);
};

export const emitDisconnected = (conversationId: string) => {
  getSocket().emit('disconnected', conversationId);
};

export const emitSendMessage = (conversationId: string, text: string) => {
  getSocket().emit('send_message', { conversationId, text });
};

export const onConnect = (callback: () => void) => {
  getSocket().on('connect', callback);
};

export const onDisconnect = (callback: () => void) => {
  getSocket().on('disconnect', callback);
};

export const onErrorMessage = (callback: (error: string) => void) => {
  getSocket().on('error_message', callback);
};

export const onUnreadCleared = (callback: (data: { conversationId: string }) => void) => {
  getSocket().on('unread_cleared', callback);
};

export const onReceiveMessage = (callback: (data: ChatMessage) => void) => {
  getSocket().on('receive_message', callback);
};

export const onUserTyping = (callback: (data: UserTypingData) => void) => {
  getSocket().on('user_typing', callback);
};

export const onUserStatus = (callback: (data: UserStatusData) => void) => {
  getSocket().on('user_status', callback);
};

export const clearAllChatListeners = () => {
  const socket = getSocket();
  socket.off('connect');
  socket.off('disconnect');
  socket.off('error_message');
  socket.off('unread_cleared');
  socket.off('user_typing');
  socket.off('user_status');
};
