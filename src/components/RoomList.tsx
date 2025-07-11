import { useGetRooms } from '@/hooks/useListRooms';
import { dateFormatter } from '@/lib/formatRelaltiveDate';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';

// type RoomListProps = {}

export const RoomList: React.FC = () => {
  const { data } = useGetRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas Recentes</CardTitle>
        <CardDescription>
          Acesso Rápido as salas criadas recentemente.
        </CardDescription>
        <CardContent className="flex flex-col gap-3">
          {data?.map((room) => (
            <Link
              className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent/50"
              key={room.id}
              to={`/room/${room.id}`}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-semibold text-lg">{room.name}</h3>
                <div className="itemss-center flex gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {dateFormatter(new Date(room.createdAt)).fromNow()}
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    {room.questionsCount} Pergunta(s)
                  </Badge>
                </div>
                {/* <p className='text-sm text-muted-foreground'>{room.description}</p> */}
              </div>
              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
