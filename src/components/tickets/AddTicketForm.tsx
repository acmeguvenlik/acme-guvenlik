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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { Ticket } from "@/data/dummyTickets";
import { RichTextEditor } from "@/components/editor/RichTextEditor"; // RichTextEditor import edildi

const formSchema = z.object({
  subject: z.string().min(5, "Konu en az 5 karakter olmalıdır."),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır."),
  priority: z.enum(["Düşük", "Orta", "Yüksek", "Acil"], {
    message: "Geçerli bir öncelik seçiniz.",
  }).default("Orta"),
});

interface AddTicketFormProps {
  onSuccess?: (newTicket: Ticket) => void;
  initialData?: Ticket; // Düzenleme için
}

export function AddTicketForm({ onSuccess, initialData }: AddTicketFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      subject: "",
      description: "",
      priority: "Orta",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Bu kısım normalde backend'e gönderilir.
    // Şimdilik dummy veriye ekliyoruz.
    const newTicket: Ticket = {
      id: initialData?.id || `TKT-${Date.now()}`,
      subject: values.subject,
      description: values.description,
      status: initialData?.status || "Açık", // Yeni oluşturuluyorsa 'Açık', düzenleniyorsa mevcut durum
      priority: values.priority,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
      dealerId: initialData?.dealerId || "D001", // Örnek bayi ID'si, gerçekte giriş yapan bayiden alınır
      dealerName: initialData?.dealerName || "ABC Ticaret", // Örnek bayi adı
      messages: initialData?.messages || [],
    };

    if (initialData) {
      showSuccess("Destek talebi başarıyla güncellendi!");
    } else {
      showSuccess("Destek talebiniz başarıyla oluşturuldu!");
    }
    form.reset();
    onSuccess?.(newTicket);
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
                <Input placeholder="Destek talebinizin konusu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <RichTextEditor // Textarea yerine RichTextEditor kullanıldı
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Detaylı açıklama..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Öncelik</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Öncelik Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Düşük">Düşük</SelectItem>
                  <SelectItem value="Orta">Orta</SelectItem>
                  <SelectItem value="Yüksek">Yüksek</SelectItem>
                  <SelectItem value="Acil">Acil</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "Talebi Güncelle" : "Talep Oluştur"}
        </Button>
      </form>
    </Form>
  );
}