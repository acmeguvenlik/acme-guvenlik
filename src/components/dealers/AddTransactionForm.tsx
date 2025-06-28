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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";
import { Transaction } from "@/data/dummyTransactions";
import { dummyDealers } from "@/data/dummyDealers"; // dummyDealers yeni konumundan import edildi

const formSchema = z.object({
  id: z.string().optional(), // Düzenleme için id eklendi
  type: z.enum(["Ödeme", "Borç", "Fatura", "İade", "Diğer"], {
    message: "Geçerli bir işlem tipi seçiniz.",
  }),
  amount: z.number().min(0.01, {
    message: "Tutar 0'dan büyük olmalıdır.",
  }),
  description: z.string().min(3, {
    message: "Açıklama en az 3 karakter olmalıdır.",
  }),
});

interface AddTransactionFormProps {
  dealerId: string;
  initialData?: Transaction; // Düzenleme için başlangıç verileri
  onSuccess?: (newTransaction: Transaction) => void;
}

export function AddTransactionForm({ dealerId, initialData, onSuccess }: AddTransactionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      id: initialData.id,
      type: initialData.type,
      amount: Math.abs(initialData.amount), // Düzenlerken tutarı pozitif göster
      description: initialData.description,
    } : {
      type: "Ödeme",
      amount: 0,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const processedAmount = values.type === "Borç" || values.type === "Fatura" ? -values.amount : values.amount;
    
    const newTransaction: Transaction = {
      id: initialData?.id || `TRN-${Date.now()}`,
      dealerId: dealerId,
      type: values.type,
      amount: processedAmount,
      description: values.description,
      date: initialData?.date || new Date(), // Düzenlemede tarihi koru
    };

    if (initialData) {
      // Düzenleme modu
      showSuccess("İşlem başarıyla güncellendi!");
    } else {
      // Ekleme modu
      showSuccess("İşlem başarıyla eklendi!");
    }
    form.reset();
    onSuccess?.(newTransaction);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İşlem Tipi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="İşlem Tipi Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ödeme">Ödeme (Alacak)</SelectItem>
                  <SelectItem value="Borç">Borç (Gider)</SelectItem>
                  <SelectItem value="Fatura">Fatura (Gider)</SelectItem>
                  <SelectItem value="İade">İade (Alacak)</SelectItem>
                  <SelectItem value="Diğer">Diğer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tutar (₺)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100.00"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <Textarea placeholder="İşlem açıklaması" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "İşlemi Güncelle" : "İşlemi Ekle"}
        </Button>
      </form>
    </Form>
  );
}