import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";
import { RichTextEditor } from "@/components/editor/RichTextEditor"; // RichTextEditor import edildi

const formSchema = z.object({
  content: z.string().min(1, "Mesaj boş olamaz."),
});

interface TicketMessageFormProps {
  onSendMessage: (content: string) => void;
}

export function TicketMessageForm({ onSendMessage }: TicketMessageFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSendMessage(values.content);
    form.reset();
    showSuccess("Mesajınız gönderildi!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor // Textarea yerine RichTextEditor kullanıldı
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Mesajınızı buraya yazın..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Mesaj Gönder</Button>
      </form>
    </Form>
  );
}