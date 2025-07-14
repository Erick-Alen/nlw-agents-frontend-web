import { useGetRoomQuestions } from '@/hooks/useRoomQuestions';
import { QuestionItem } from './QuestionItem';

type QuestionListProps = {
  roomId: string;
};

export const QuestionList: React.FC<QuestionListProps> = ({ roomId }) => {
  const { data } = useGetRoomQuestions(roomId);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
};
