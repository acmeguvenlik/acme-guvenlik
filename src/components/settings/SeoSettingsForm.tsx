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
import { showSuccess } from "@/utils/toast";

const formSchema = z.object({
  metaTitle: z.string().min(5, "Meta başlığı en az 5 karakter olmalıdır."),
  metaDescription: z.string().min(10, "Meta açıklaması en az 10 karakter olmalıdır."),
  keywords: z.string().optional(),
  canonicalUrl: z.string().url("Geçerli bir URL giriniz.").optional().or(z.literal('')),
});

export function SeoSettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "Acme Güvenlik - Yönetim Paneli",
      metaDescription: "Acme Güvenlik B2B yönetim paneli ile bayilerinizi, stoklarınızı ve finansal işlemlerinizi kolayca yönetin.",
      keywords: "güvenlik, b2b, yönetim, panel, stok, bayi, fatura",
      canonicalUrl: "https://www.acmegüvenlik.com",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("SEO Ayarları Güncellendi:", values);
    showSuccess("SEO ayarları başarıyla güncellendi!");
    // Gerçek uygulamada bu veriler backend'e gönderilir.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Başlığı</FormLabel>
              <FormControl>
                <Input placeholder="Sayfa Başlığı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Açıklaması</FormLabel>
              <FormControl>
                <Textarea placeholder="Sayfa açıklaması" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anahtar Kelimeler (Virgülle Ayırın)</FormLabel>
              <FormControl>
                <Input placeholder="anahtar, kelimeler, buraya" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="canonicalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kanonik URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://www.example.com/sayfa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Ayarları Kaydet</Button>
      </form>
    </Form>
  );
}