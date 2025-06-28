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
  siteName: z.string().min(2, "Site adı en az 2 karakter olmalıdır."),
  siteDescription: z.string().optional(),
  contactEmail: z.string().email("Geçerli bir e-posta adresi giriniz."),
  address: z.string().optional(),
});

export function SiteSettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "Acme Güvenlik",
      siteDescription: "B2B güvenlik sistemleri yönetim paneli.",
      contactEmail: "info@acmegüvenlik.com",
      address: "Örnek Mah. Örnek Cad. No:123, Örnek Şehir",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Site Ayarları Güncellendi:", values);
    showSuccess("Site ayarları başarıyla güncellendi!");
    // Gerçek uygulamada bu veriler backend'e gönderilir.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Adı</FormLabel>
              <FormControl>
                <Input placeholder="Acme Güvenlik" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="siteDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Açıklaması</FormLabel>
              <FormControl>
                <Textarea placeholder="Uygulamanızın kısa açıklaması" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İletişim E-postası</FormLabel>
              <FormControl>
                <Input type="email" placeholder="info@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Textarea placeholder="Şirket adresi" {...field} />
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