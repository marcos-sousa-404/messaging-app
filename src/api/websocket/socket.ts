import { io, Socket } from 'socket.io-client';
import { authStore } from '@/store/useAuthStore.ts';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    const token = authStore.getState().token;

    socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token,
      },
      autoConnect: false,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
