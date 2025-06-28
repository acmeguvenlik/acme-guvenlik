import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dummyUsers } from '@/pages/UsersPage'; // Kullanıcı listesi için

const formSchema = z.object({
  subject: z.string().min(5, "Konu en az 5 karakter olmalıdır."),
  participantIds: z.array(z.string()).min(1, "En az bir katılımcı seçmelisiniz."),
});

interface AddConversationFormProps {
  onAddConversation: (subject: string, participantIds: string[]) => void;
  currentUserId: string;
}

export function AddConversationForm({ onAddConversation, currentUserId }: AddConversationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      participantIds: [],
    },
  });

  const availableParticipants = dummyUsers.filter(user => user.id !== currentUserId);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddConversation(values.subject, values.participantIds);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konu</FormLabel>
              <FormControl>
                <Input placeholder="Konuşma konusu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="participantIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Katılımcılar</FormLabel>
              <Select onValueChange={(value) => field.onChange([value])} value={field.value[0]}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Katılımcı Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableParticipants.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.username} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Konuşma Başlat</Button>
      </form>
    </Form>
  );
}