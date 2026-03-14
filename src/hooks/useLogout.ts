import useAuthStore, { authStore } from '@/store/useAuthStore.ts';
import { useNavigate } from 'react-router';
import useToast from '@/hooks/useToast.ts';

const useLogout = () => {
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  const showToast = useToast();

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
    showToast({
      title: 'Você saiu da sua conta',
    });
  };

  return { logout };
};

export default useLogout;

export const logoutUser = (expiredToken?: boolean) => {
  const state = authStore.getState();

  state.setToken(null);
  state.setUser(null);

  window.location.href = expiredToken ? '/login?expired=true' : '/login';
};
