import type { getRoomsAPIResponse } from '@/components/http/types/getRoomsResponse';
import { useQuery } from '@tanstack/react-query';

export const useGetRooms = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      const res: getRoomsAPIResponse[] = await response.json();
      return res;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return {
    data: data || [],
    isLoading,
  };
};
