import { useAuthStore } from '@/store/useAuthStore.ts';
import { useNavigate } from 'react-router';
import useToast from '@/hooks/useToast.tsx';

const useLogout = () => {
  const { setToken, setUser } = useAuthStore()
  const navigate = useNavigate();
  const showToast = useToast();

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
    showToast({
      title: 'Você saiu da sua conta',
    })
  };

  return { logout };
}

export default useLogout;