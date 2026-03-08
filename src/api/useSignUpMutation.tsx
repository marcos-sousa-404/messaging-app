import getApi from '@/api/getApi.ts';
import { useMutation } from 'react-query';
import useToast from '@/hooks/useToast.tsx';

const signUp = async (payload: SignUpPayload) => {
  const api = getApi();

  return api.post('/auth/register', payload);
}

const useSignUpMutation = () => {
  const showToast = useToast();

  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: signUp,
    onSuccess: () => {
      showToast({
        title: 'Registro feito com sucesso!',
        status: 'success',
      });
    },
    onError: (error: any) => {
      showToast({
        title: 'Erro ao fazer seu cadastro',
        description: error.response?.data?.message || 'Por favor, verifique suas informações.',
        status: 'error',
      });
    }
  });
}

export default useSignUpMutation;

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
}