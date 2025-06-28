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
  onSuccess?: (newTransaction: Transaction) => void;
}

export function AddTransactionForm({ dealerId, onSuccess }: AddTransactionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Ödeme",
      amount: 0,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTransaction: Transaction = {
      id: `TRN-${Date.now()}`,
      dealerId: dealerId,
      type: values.type,
      amount: values.type === "Borç" || values.type === "Fatura" ? -values.amount : values.amount, // Borç ve Fatura için tutarı negatif yap
      description: values.description,
      date: new Date(),
    };

    // Dummy veriyi güncelle (gerçek uygulamada backend API çağrısı olur)
    // dummyTransactions.push(newTransaction); // Bu kısım dışarıda yönetilecek

    // Bayinin bakiyesini güncelle
    const dealerIndex = dummyDealers.findIndex(d => d.id === dealerId);
    if (dealerIndex !== -1) {
      dummyDealers[dealerIndex].balance += newTransaction.amount;
      // State'i güncellemek için DealersPage'deki dummyDealers'ı yeniden set etmemiz gerekebilir.
      // Bu dummy data yapısında doğrudan güncelleme yapıyoruz.
    }

    showSuccess("İşlem başarıyla eklendi ve bakiye güncellendi!");
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
        <Button type="submit" className="w-full">İşlemi Ekle</Button>
      </form>
    </Form>
  );
}