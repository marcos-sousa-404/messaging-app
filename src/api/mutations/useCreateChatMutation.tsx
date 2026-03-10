import getApi from '@/api/getApi.ts';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast.tsx';

const createChat = async (payload: CreateChatPayload) => {
  const api = getApi();

  return api.post('/conversations', payload);
};

const useCreateChatMutation = () => {
  const showToast = useToast();

  return useMutation({
    mutationKey: ['createChat'],
    mutationFn: createChat,
    onSuccess: () => {
      showToast({
        title: 'Conversa criada com sucesso!',
        status: 'success',
      });
    },
    onError: (error: any) => {
      showToast({
        title: 'Erro ao criar conversa',
        description:
          error.response?.data?.message ||
          'Não foi possível iniciar a conversa.',
        status: 'error',
      });
    },
  });
};

export default useCreateChatMutation;

type CreateChatPayload = {
  recipientId: string;
};