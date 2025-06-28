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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

const formSchema = z.object({
  status: z.enum(["Beklemede", "Kargoda", "Tamamlandı", "İptal Edildi"], {
    message: "Geçerli bir durum seçiniz.",
  }),
});

interface UpdateOrderStatusFormProps {
  currentStatus: "Beklemede" | "Kargoda" | "Tamamlandı" | "İptal Edildi";
  orderId: string;
  onSuccess?: (orderId: string, newStatus: string) => void;
}

export function UpdateOrderStatusForm({ currentStatus, orderId, onSuccess }: UpdateOrderStatusFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(`Sipariş ${orderId} durumu güncellendi:`, values.status);
    showSuccess(`Sipariş #${orderId} durumu "${values.status}" olarak güncellendi!`);
    onSuccess?.(orderId, values.status);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sipariş Durumu</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Durum Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Beklemede">Beklemede</SelectItem>
                  <SelectItem value="Kargoda">Kargoda</SelectItem>
                  <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                  <SelectItem value="İptal Edildi">İptal Edildi</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Durumu Güncelle</Button>
      </form>
    </Form>
  );
}