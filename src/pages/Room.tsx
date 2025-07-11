import { Navigate, useParams } from 'react-router-dom';

// type RoomProps = {};

export const Room: React.FC= () => {
  const params = useParams();
  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }
  return <div>Room</div>;
};
