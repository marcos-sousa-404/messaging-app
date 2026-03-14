import axios, { type AxiosError } from 'axios';
import { authStore } from '@/store/useAuthStore.ts';
import { logoutUser } from '@/hooks/useLogout.ts';

const getApi = () => {
  const token = authStore.getState().token;

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  instance.interceptors.response.use(undefined, (error: AxiosError) => {
    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized) {
      logoutUser(true);
    }

    return Promise.reject(error);
  });

  return instance;
};

export default getApi;
