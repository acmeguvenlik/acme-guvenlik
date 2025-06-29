import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";

const formSchema = z.object({
  smtpHost: z.string().min(1, "SMTP Host alanı boş bırakılamaz."),
  smtpPort: z.number().min(1, "SMTP Port geçerli bir sayı olmalıdır."),
  smtpUsername: z.string().optional(),
  smtpPassword: z.string().optional(),
  senderEmail: z.string().email("Geçerli bir gönderen e-posta adresi giriniz."),
  senderName: z.string().optional(),
  enableSsl: z.boolean().default(true),
});

export function EmailSettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smtpHost: "smtp.example.com",
      smtpPort: 587,
      smtpUsername: "user@example.com",
      smtpPassword: "your_smtp_password",
      senderEmail: "noreply@acmegüvenlik.com",
      senderName: "Acme Güvenlik",
      enableSsl: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("E-posta Ayarları Güncellendi:", values);
    showSuccess("E-posta ayarları başarıyla güncellendi!");
    // Gerçek uygulamada bu veriler backend'e gönderilir.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="smtpHost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SMTP Host</FormLabel>
              <FormControl>
                <Input placeholder="smtp.example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="smtpPort"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SMTP Port</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="587"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="smtpUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SMTP Kullanıcı Adı (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="kullaniciadi@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="smtpPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SMTP Şifresi (Opsiyonel)</FormLabel>
              <FormControl>
                <Input type="password" placeholder="şifreniz" {...field} />
              </FormControl>
              <FormDescription>Hassas veriler genellikle backend'de güvenli bir şekilde saklanmalıdır.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senderEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gönderen E-posta Adresi</FormLabel>
              <FormControl>
                <Input type="email" placeholder="noreply@acmegüvenlik.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gönderen Adı (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="Acme Güvenlik" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableSsl"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">SSL/TLS Etkinleştir</FormLabel>
                <FormDescription>
                  E-posta iletişimini şifrelemek için SSL/TLS kullan.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Ayarları Kaydet</Button>
      </form>
    </Form>
  );
}