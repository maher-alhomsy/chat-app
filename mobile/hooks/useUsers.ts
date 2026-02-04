import { useQuery } from '@tanstack/react-query';

import { User } from '@/types';
import { useApi } from '@/lib/axios';

const useUsers = () => {
  const { apiWithAuth } = useApi();

  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await apiWithAuth<{ users: User[] }>({
        method: 'GET',
        url: '/users',
      });

      return data;
    },
    select(data) {
      return data.users;
    },
  });
};

export default useUsers;
