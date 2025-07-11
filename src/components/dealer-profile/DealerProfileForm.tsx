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
  name: z.string().min(2, {
    message: "Bayi adı en az 2 karakter olmalıdır.",
  }),
  contact: z.string().min(2, {
    message: "Yetkili kişi adı en az 2 karakter olmalıdır.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Telefon numarası 10 haneli olmalıdır (örn: 5551234567).",
  }).optional().or(z.literal('')), // Opsiyonel ve boş stringe izin ver
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
});

interface DealerProfileFormProps {
  initialData: {
    name: string;
    contact: string;
    phone: string;
    email: string;
  };
  onSave?: (values: z.infer<typeof formSchema>) => void;
}

export function DealerProfileForm({ initialData, onSave }: DealerProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Bayi profil güncellendi:", values);
    showSuccess("Profil bilgileriniz başarıyla güncellendi!");
    onSave?.(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bayi Adı</FormLabel>
              <FormControl>
                <Input placeholder="ABC Ticaret" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yetkili Kişi</FormLabel>
              <FormControl>
                <Input placeholder="Ali Can" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input placeholder="5551234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input placeholder="bayi@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Profili Güncelle</Button>
      </form>
    </Form>
  );
}