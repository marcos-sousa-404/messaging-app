import getApi from '@/api/getApi.ts';
import { useMutation } from 'react-query';
import useToast from '@/hooks/useToast.tsx';

const login = async (payload: LoginPayload) => {
  const api = getApi();

  return api.post('/auth/login', payload);
}

const useLoginMutation = () => {
  const showToast = useToast();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: () => {
      showToast({
        title: 'Login feito com sucesso!',
        status: 'success',
      });
    },
    onError: (error: any) => {
      showToast({
        title: 'Erro ao fazer login',
        description: error.response?.data?.message || 'Por favor, verifique suas informações.',
        status: 'error',
      });
    }
  });
}

export default useLoginMutation;

type LoginPayload = {
  email: string;
  password: string;
}