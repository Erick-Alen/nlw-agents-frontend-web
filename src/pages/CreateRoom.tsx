import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGetRooms } from '@/hooks/useListRooms';

// type CreateRoomProps = {};

export const CreateRoom: React.FC<CreateRoomProps> = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetRooms();

  return (
    <div>
      CreateRoom
      {isLoading && <p>Loading...</p>}
      {data?.map((room) => (
        <div key={room.id}>
          <Button
            className="cursor-pointer"
            onClick={() => navigate(`/room/${room.id}`)}
            variant="link"
          >
            {room.name}
          </Button>
          <p>{room.description}</p>
          <p>{new Date(room.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};
