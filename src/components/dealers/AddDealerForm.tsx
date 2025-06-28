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
  id: z.string().optional(), // Düzenleme için id eklendi
  name: z.string().min(2, {
    message: "Bayi adı en az 2 karakter olmalıdır.",
  }),
  contact: z.string().min(2, {
    message: "Yetkili kişi adı en az 2 karakter olmalıdır.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Telefon numarası 10 haneli olmalıdır (örn: 5551234567).",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
});

export type DealerFormData = z.infer<typeof formSchema>;

interface AddDealerFormProps {
  initialData?: DealerFormData; // Düzenleme için başlangıç verileri
  onSuccess?: (data: DealerFormData) => void;
}

export function AddDealerForm({ initialData, onSuccess }: AddDealerFormProps) {
  const form = useForm<DealerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      contact: "",
      phone: "",
      email: "",
    },
  });

  function onSubmit(values: DealerFormData) {
    if (initialData?.id) {
      // Düzenleme modu
      console.log("Bayi güncellendi:", values);
      showSuccess("Bayi başarıyla güncellendi!");
    } else {
      // Ekleme modu
      console.log("Yeni bayi verileri:", values);
      showSuccess("Bayi başarıyla eklendi!");
    }
    form.reset();
    onSuccess?.(values); // Diyalogu kapatmak ve listeyi güncellemek için callback
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
        <Button type="submit" className="w-full">
          {initialData?.id ? "Bayiyi Güncelle" : "Bayi Ekle"}
        </Button>
      </form>
    </Form>
  );
}