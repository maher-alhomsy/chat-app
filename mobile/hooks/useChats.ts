import { useQuery } from '@tanstack/react-query';

import { useApi } from '@/lib/axios';
import type { Chat } from '@/types';

const useChats = () => {
  const { apiWithAuth } = useApi();

  return useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      const { data } = await apiWithAuth<Chat[]>({
        method: 'GET',
        url: '/chats/',
      });

      return data;
    },
  });
};

export default useChats;
