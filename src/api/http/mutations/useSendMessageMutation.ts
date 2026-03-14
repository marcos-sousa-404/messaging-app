import getApi from '@/api/http/getApi.ts';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast.ts';
import type { ApiError } from '@/types/ApiError.ts';
import type { ChatMessage } from '@/types/ChatMessage.ts';
import type { AxiosResponse } from 'axios';

type SendMessagePayload = {
  receiverId: string;
  conversationId: string;
  text: string;
};

const sendMessage = async (payload: SendMessagePayload) => {
  const api = getApi();

  return api.post<ChatMessage>('/messages', payload);
};

const useSendMessageMutation = () => {
  const showToast = useToast();

  return useMutation<AxiosResponse<ChatMessage>, ApiError, SendMessagePayload>({
    mutationKey: ['send-message'],
    mutationFn: sendMessage,
    onError: (error: ApiError) => {
      showToast({
        title: 'Erro ao enviar mensagem',
        description: error.response?.data?.message || 'Não foi possível enviar a mensagem.',
        status: 'error',
      });
    },
  });
};

export default useSendMessageMutation;
