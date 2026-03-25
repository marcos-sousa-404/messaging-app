import getApi from '@/api/http/getApi.ts';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast.ts';
import type { ApiError } from '@/types/ApiError.ts';

const updateUser = async (payload: UpdateUserPayload) => {
  const api = getApi();

  const formData = new FormData();
  if (payload.image) {
    formData.append('image', payload.image);
  }

  return api.patch(`/users/edit/${payload.id}`, formData);
};

const useUpdateUserMutation = () => {
  const showToast = useToast();

  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUser,
    onSuccess: () => {
      showToast({
        title: 'Usuário atualizado com sucesso!',
        status: 'success',
      });
    },
    onError: (error: ApiError) => {
      showToast({
        title: 'Erro ao atualizar usuário',
        description: error.response?.data?.message || 'Não foi possível atualizar o usuário.',
        status: 'error',
      });
    },
  });
};

export default useUpdateUserMutation;

type UpdateUserPayload = {
  id: string;
  image?: Blob;
};
