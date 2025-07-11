import { CreateRoomForm } from '@/components/CreateRoomForm';
import { RoomList } from '@/components/RoomList';

// type CreateRoomProps = {};

export const CreateRoom: React.FC = () => {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-6">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  );
};
