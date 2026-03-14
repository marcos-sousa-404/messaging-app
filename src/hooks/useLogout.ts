import useAuthStore, { authStore } from '@/store/useAuthStore.ts';
import { useNavigate } from 'react-router';
import useToast from '@/hooks/useToast.ts';
import { chatStore } from '@/store/useChatStore.ts';
import { useChatStore } from '@/store';

const useLogout = () => {
  const { setToken, setUser } = useAuthStore();
  const { reset } = useChatStore();
  const navigate = useNavigate();
  const showToast = useToast();

  const logout = () => {
    setToken(null);
    setUser(null);
    reset();
    navigate('/login');
    showToast({
      title: 'Você saiu da sua conta',
    });
  };

  return { logout };
};

export default useLogout;

export const logoutUser = (expiredToken?: boolean) => {
  const authState = authStore.getState();
  const chatState = chatStore.getState();

  authState.setToken(null);
  authState.setUser(null);
  chatState.reset();

  window.location.href = expiredToken ? '/login?expired=true' : '/login';
};
