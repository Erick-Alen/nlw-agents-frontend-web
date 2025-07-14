import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  CreateRoomRequest,
  CreateRoomResponse,
} from '@/components/http/types/createRooms';
import { storageKeys } from './storageKeys';

export const useCreateRoom = () => {
  const queryclient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create room');
      }
      const res: CreateRoomResponse = await response.json();
      return res;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: storageKeys.rooms });
      // Optionally, you can handle success actions here, like showing a toast or redirecting
    },
  });

  return { createRoom: mutateAsync, isPending };
};
