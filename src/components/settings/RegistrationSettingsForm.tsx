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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

const formSchema = z.object({
  enableRegistration: z.boolean().default(true),
  defaultUserRole: z.enum(["dealer", "viewer"]).default("dealer"),
  requireEmailVerification: z.boolean().default(false),
});

export function RegistrationSettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableRegistration: true,
      defaultUserRole: "dealer",
      requireEmailVerification: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Kayıt Ayarları Güncellendi:", values);
    showSuccess("Kayıt ayarları başarıyla güncellendi!");
    // Gerçek uygulamada bu veriler backend'e gönderilir.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="enableRegistration"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Yeni Kayıtları Etkinleştir</FormLabel>
                <FormDescription>
                  Yeni kullanıcıların sisteme kaydolmasına izin ver.
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
          name="defaultUserRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Varsayılan Kullanıcı Rolü</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Varsayılan rol seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dealer">Bayi</SelectItem>
                  <SelectItem value="viewer">Görüntüleyici</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Yeni kaydolan kullanıcılara atanacak varsayılan rol.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requireEmailVerification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">E-posta Doğrulama Gerekli</FormLabel>
                <FormDescription>
                  Kullanıcıların kayıt olduktan sonra e-posta adreslerini doğrulamalarını zorunlu kıl.
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