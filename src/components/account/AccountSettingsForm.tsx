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
import { showSuccess, showError } from "@/utils/toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "Yeni şifre en az 6 karakter olmalıdır.").optional().or(z.literal('')),
  confirmNewPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && !data.currentPassword) {
    return false; // Yeni şifre varsa mevcut şifre zorunlu
  }
  if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
    return false; // Yeni şifre ve tekrarı eşleşmeli
  }
  return true;
}, {
  message: "Yeni şifreler eşleşmiyor veya mevcut şifre girilmedi.",
  path: ["confirmNewPassword"],
});

interface AccountSettingsFormProps {
  initialEmail: string;
  onSave: (email: string, newPassword?: string) => void;
}

export function AccountSettingsForm({ initialEmail, onSave }: AccountSettingsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialEmail,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Gerçek uygulamada bu kısım API çağrısı ile backend'e gönderilir.
    // Şimdilik sadece konsola yazdırıp toast mesajı gösteriyoruz.
    console.log("Hesap ayarları güncellendi:", values);

    if (values.newPassword) {
      // Şifre değiştirme işlemi
      if (values.currentPassword === "testpassword") { // Dummy kontrol
        showSuccess("E-posta ve şifre başarıyla güncellendi!");
        onSave(values.email, values.newPassword);
      } else {
        showError("Mevcut şifre yanlış.");
        return;
      }
    } else {
      // Sadece e-posta güncelleme
      showSuccess("E-posta başarıyla güncellendi!");
      onSave(values.email);
    }
    form.reset({
      email: values.email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta Adresi</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2 border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold">Şifre Değiştir</h3>
          <p className="text-sm text-muted-foreground">Şifrenizi değiştirmek istemiyorsanız boş bırakın.</p>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mevcut Şifre</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yeni Şifre</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>En az 6 karakter olmalıdır.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yeni Şifreyi Onayla</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">Ayarları Kaydet</Button>
      </form>
    </Form>
  );
}