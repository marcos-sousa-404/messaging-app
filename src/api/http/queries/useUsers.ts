import getApi from '@/api/http/getApi.ts';
import type { User } from '@/types/User';
import { useQuery } from '@tanstack/react-query';
import type { PaginatedData } from '@/types/PaginatedData.ts';

const users = async () => {
  const api = getApi();

  return api.get<PaginatedData<User>>('/users');
};

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: users,
  });
};

export default useUsers;
