import getApi from '@/api/http/getApi.ts';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast.ts';
import type { ApiError } from '@/types/ApiError.ts';

const signUp = async (payload: SignUpPayload) => {
  const api = getApi();

  return api.post('/auth/register', payload);
};

const useSignUpMutation = () => {
  const showToast = useToast();

  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: signUp,
    onSuccess: () => {
      showToast({
        title: 'Registro feito com sucesso!',
        status: 'success',
      });
    },
    onError: (error: ApiError) => {
      showToast({
        title: 'Erro ao fazer seu cadastro',
        description: error.response?.data?.message || 'Por favor, verifique suas informações.',
        status: 'error',
      });
    },
  });
};

export default useSignUpMutation;

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};
