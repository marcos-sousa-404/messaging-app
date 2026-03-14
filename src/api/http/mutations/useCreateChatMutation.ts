import getApi from '@/api/http/getApi.ts';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast.ts';
import type { ApiError } from '@/types/ApiError.ts';

const createChat = async (payload: CreateChatPayload) => {
  const api = getApi();

  return api.post('/conversations', payload);
};

const useCreateChatMutation = () => {
  const showToast = useToast();

  return useMutation({
    mutationKey: ['create-chat'],
    mutationFn: createChat,
    onSuccess: () => {
      showToast({
        title: 'Conversa criada com sucesso!',
        status: 'success',
      });
    },
    onError: (error: ApiError) => {
      showToast({
        title: 'Erro ao criar conversa',
        description: error.response?.data?.message || 'Não foi possível iniciar a conversa.',
        status: 'error',
      });
    },
  });
};

export default useCreateChatMutation;

type CreateChatPayload = {
  recipientId: string;
};
