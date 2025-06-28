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
import { Announcement } from "@/data/dummyAnnouncements";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır."),
  content: z.string().min(10, "İçerik en az 10 karakter olmalıdır."),
  targetRole: z.enum(["admin", "dealer", "all"], {
    message: "Geçerli bir hedef rol seçiniz.",
  }),
});

interface AddAnnouncementFormProps {
  initialData?: Announcement;
  onSuccess?: (data: Announcement) => void;
}

export function AddAnnouncementForm({ initialData, onSuccess }: AddAnnouncementFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      targetRole: "all",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submittedData: Announcement = {
      ...values,
      id: initialData?.id || `ANN-${Date.now()}`, // Yeni ID oluştur veya mevcut ID'yi kullan
      createdAt: initialData?.createdAt || new Date(), // Oluşturma tarihini koru veya yeni oluştur
    };

    if (initialData?.id) {
      console.log("Duyuru güncellendi:", submittedData);
      showSuccess("Duyuru başarıyla güncellendi!");
    } else {
      console.log("Yeni duyuru eklendi:", submittedData);
      showSuccess("Duyuru başarıyla eklendi!");
    }
    form.reset();
    onSuccess?.(submittedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başlık</FormLabel>
              <FormControl>
                <Input placeholder="Duyuru Başlığı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İçerik</FormLabel>
              <FormControl>
                <Textarea placeholder="Duyuru içeriği..." rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hedef Kitle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Hedef kitle seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">Tüm Kullanıcılar</SelectItem>
                  <SelectItem value="admin">Yöneticiler</SelectItem>
                  <SelectItem value="dealer">Bayiler</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData?.id ? "Duyuruyu Güncelle" : "Duyuru Ekle"}
        </Button>
      </form>
    </Form>
  );
}