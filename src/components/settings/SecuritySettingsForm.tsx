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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

const formSchema = z.object({
  minPasswordLength: z.number().min(6, "Minimum şifre uzunluğu en az 6 olmalıdır.").max(32, "Minimum şifre uzunluğu en fazla 32 olmalıdır."),
  requireSpecialChar: z.boolean().default(false),
  requireNumber: z.boolean().default(false),
  requireUppercase: z.boolean().default(false),
  sessionTimeout: z.enum(["30m", "1h", "8h", "24h", "never"]).default("8h"),
  enableTwoFactorAuth: z.boolean().default(false),
});

export function SecuritySettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minPasswordLength: 8,
      requireSpecialChar: true,
      requireNumber: true,
      requireUppercase: true,
      sessionTimeout: "8h",
      enableTwoFactorAuth: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Güvenlik Ayarları Güncellendi:", values);
    showSuccess("Güvenlik ayarları başarıyla güncellendi!");
    // Gerçek uygulamada bu veriler backend'e gönderilir.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Şifre Politikası</h3>
          <FormField
            control={form.control}
            name="minPasswordLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Şifre Uzunluğu</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="8"
                    min="6"
                    max="32"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Kullanıcı şifreleri için minimum karakter sayısı.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requireSpecialChar"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Özel Karakter Gerekli</FormLabel>
                  <FormDescription>
                    Şifrelerin en az bir özel karakter içermesini zorunlu kıl.
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
          <FormField
            control={form.control}
            name="requireNumber"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Sayı Gerekli</FormLabel>
                  <FormDescription>
                    Şifrelerin en az bir sayı içermesini zorunlu kıl.
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
          <FormField
            control={form.control}
            name="requireUppercase"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Büyük Harf Gerekli</FormLabel>
                  <FormDescription>
                    Şifrelerin en az bir büyük harf içermesini zorunlu kıl.
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
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Oturum ve Kimlik Doğrulama</h3>
          <FormField
            control={form.control}
            name="sessionTimeout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oturum Zaman Aşımı</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Oturum zaman aşımı süresi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="30m">30 Dakika</SelectItem>
                    <SelectItem value="1h">1 Saat</SelectItem>
                    <SelectItem value="8h">8 Saat</SelectItem>
                    <SelectItem value="24h">24 Saat</SelectItem>
                    <SelectItem value="never">Asla (Güvenli Değil)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Kullanıcıların otomatik olarak çıkış yapılacağı süre.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enableTwoFactorAuth"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">İki Faktörlü Kimlik Doğrulama (2FA)</FormLabel>
                  <FormDescription>
                    Tüm kullanıcılar için iki faktörlü kimlik doğrulamayı etkinleştir.
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
        </div>
        <Button type="submit">Ayarları Kaydet</Button>
      </form>
    </Form>
  );
}