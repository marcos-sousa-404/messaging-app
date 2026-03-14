import getApi from '@/api/getApi.ts';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast.tsx';
import type { ApiError } from '@/types/ApiError.ts';

const login = async (payload: LoginPayload) => {
  const api = getApi();

  return api.post('/auth/login', payload);
};

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
    onError: (error: ApiError) => {
      showToast({
        title: 'Erro ao fazer login',
        description: error.response?.data?.message || 'Por favor, verifique suas informações.',
        status: 'error',
      });
    },
  });
};

export default useLoginMutation;

type LoginPayload = {
  email: string;
  password: string;
};
