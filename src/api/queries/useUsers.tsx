import getApi from '@/api/getApi.ts';
import type { User } from '@/types/User';
import { useQuery } from '@tanstack/react-query';

const users = async () => {
  const api = getApi();

  return api.get<UsersData>('/users');
}

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: users,
  });
}

export default useUsers;

export interface UsersData {
  users: User[]
}