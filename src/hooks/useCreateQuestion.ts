import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  CreateQuestionRequest,
  CreateQuestionResponse,
} from '@/components/http/types/createQuestions';
import type { GetRoomQuestionsResponse } from '@/components/http/types/getRoomQuestionsResponse';
import { storageKeys } from './storageKeys';

export const useCreateQuestion = (roomId: string) => {
  const queryclient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to create question');
      }
      const res: CreateQuestionResponse = await response.json();

      return res;
    },
    // executes on the moment that the API request was made
    onMutate({ question }) {
      // allows to update the value from another query with another value
      const questionsResponse = queryclient.getQueryData<
        GetRoomQuestionsResponse[]
      >(storageKeys.getQuestions(roomId));

      const questions: GetRoomQuestionsResponse[] = questionsResponse ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };

      queryclient.setQueryData<GetRoomQuestionsResponse[]>(
        storageKeys.getQuestions(roomId),
        [newQuestion, ...questions]
      );
      return { newQuestion, questions };
    },

    onSuccess: (data, _variables, context) => {
      queryclient.setQueryData<GetRoomQuestionsResponse[]>(
        storageKeys.getQuestions(roomId),
        (questions) => {
          if (!(questions && context?.newQuestion)) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false, // Mark as no longer generating answer
              };
            }
            return question;
          });
        }
      );
      // queryclient.invalidateQueries({
      //   queryKey: storageKeys.getQuestions(roomId),
      // });
      // Optionally, you can handle success actions here, like showing a toast or redirecting
    },
    onError(error, _variables, context) {
      if (context?.questions) {
        queryclient.setQueryData<GetRoomQuestionsResponse[]>(
          storageKeys.getQuestions(roomId),
          context?.questions
        );
      }
      // If the mutation fails, we can roll back to the previous state
      console.error('Error creating question:', error);
    },
  });

  return { createQuestion: mutateAsync, isPending };
};
