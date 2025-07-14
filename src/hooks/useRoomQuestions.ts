import { useQuery } from '@tanstack/react-query';
import type { GetRoomQuestionsResponse } from '@/components/http/types/getRoomQuestionsResponse';
import { storageKeys } from './storageKeys';

export const useGetRoomQuestions = (roomId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: storageKeys.getQuestions(roomId),
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      const res: GetRoomQuestionsResponse[] = await response.json();
      return res;
    },
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return {
    data: data || [],
    isLoading,
  };
};
