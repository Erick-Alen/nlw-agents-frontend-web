import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useCreateRoom } from '@/hooks/useCreateRoom';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const createRoomSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  description: z.string().optional(),
});

type CreateRoomFormProps = z.infer<typeof createRoomSchema>;
export const CreateRoomForm: React.FC = () => {
  const createRoomForm = useForm<CreateRoomFormProps>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { createRoom } = useCreateRoom();

  const handleCreateRoom = ({ name, description }: CreateRoomFormProps) => {
    createRoom({ name, description });
    createRoomForm.reset();
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Criar sala</CardTitle>
          <CardDescription>
            Crie uma nova sala para começar a interagir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...createRoomForm}>
            <form
              className="flex flex-col gap-4"
              onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
            >
              <FormField
                control={createRoomForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome da sala" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createRoomForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite a descrição da sala"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Criar sala
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {/* Footer actions go here */}
          {/* <Button className="btn btn-primary">Criar Sala</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};
