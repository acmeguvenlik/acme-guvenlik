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
import { showSuccess } from "@/utils/toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  accountName: z.string().min(2, {
    message: "Hesap adı en az 2 karakter olmalıdır.",
  }),
  accountType: z.enum(["Müşteri", "Tedarikçi", "Diğer"], {
    message: "Geçerli bir hesap tipi seçiniz.",
  }),
  initialBalance: z.number().min(0, {
    message: "Başlangıç bakiyesi negatif olamaz.",
  }),
});

interface AddCurrentAccountFormProps {
  onSuccess?: () => void;
}

export function AddCurrentAccountForm({ onSuccess }: AddCurrentAccountFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
      accountType: "Müşteri",
      initialBalance: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Yeni cari hesap verileri:", values);
    showSuccess("Cari hesap başarıyla eklendi!");
    form.reset();
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hesap Adı</FormLabel>
              <FormControl>
                <Input placeholder="ABC Ticaret Cari Hesap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hesap Tipi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Hesap Tipi Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Müşteri">Müşteri</SelectItem>
                  <SelectItem value="Tedarikçi">Tedarikçi</SelectItem>
                  <SelectItem value="Diğer">Diğer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initialBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başlangıç Bakiyesi (₺)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1000.00"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Cari Hesap Ekle</Button>
      </form>
    </Form>
  );
}