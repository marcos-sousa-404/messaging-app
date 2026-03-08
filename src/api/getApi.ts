import axios from 'axios';
import { authStore } from '@/store/useAuthStore.ts';

const getApi = () => {
  const token = authStore.getState().token;

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

export default getApi;