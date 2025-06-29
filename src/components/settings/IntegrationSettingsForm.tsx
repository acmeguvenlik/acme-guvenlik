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
import { showSuccess } from "@/utils/toast";

const formSchema = z.object({
  googleMapsApiKey: z.string().optional(),
  paymentGatewayApiKey: z.string().optional(),
  smsGatewayApiKey: z.string().optional(),
});

export function IntegrationSettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      googleMapsApiKey: "AIzaSyC_EXAMPLE_GOOGLE_API_KEY",
      paymentGatewayApiKey: "pk_test_EXAMPLE_PAYMENT_API_KEY",
      smsGatewayApiKey: "sk_live_EXAMPLE_SMS_API_KEY",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Entegrasyon Ayarları Güncellendi:", values);
    showSuccess("Entegrasyon ayarları başarıyla güncellendi!");
    // Gerçek uygulamada bu veriler backend'e gönderilir ve hassas veriler asla doğrudan frontend'de saklanmamalıdır.
    // Bu örnek sadece UI gösterimi içindir.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormDescription className="mb-4 text-red-500 dark:text-red-400">
          Uyarı: API anahtarları gibi hassas veriler genellikle doğrudan frontend'de saklanmamalıdır. Bu form sadece UI gösterimi amaçlıdır. Gerçek uygulamalarda bu tür veriler güvenli bir backend servisi aracılığıyla yönetilmelidir.
        </FormDescription>
        <FormField
          control={form.control}
          name="googleMapsApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Haritalar API Anahtarı (Opsiyonel)</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Google Haritalar API Anahtarınız" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentGatewayApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ödeme Ağ Geçidi API Anahtarı (Opsiyonel)</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Ödeme Ağ Geçidi API Anahtarınız" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="smsGatewayApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SMS Ağ Geçidi API Anahtarı (Opsiyonel)</FormLabel>
              <FormControl>
                <Input type="password" placeholder="SMS Ağ Geçidi API Anahtarınız" {...field} />
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