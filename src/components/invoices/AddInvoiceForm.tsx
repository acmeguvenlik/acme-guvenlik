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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { dummyDealers } from "@/data/dummyDealers"; // dummyDealers import edildi
import { dummyTransactions, Transaction } from "@/data/dummyTransactions"; // dummyTransactions import edildi

const formSchema = z.object({
  invoiceNumber: z.string().min(3, {
    message: "Fatura numarası en az 3 karakter olmalıdır.",
  }),
  dealerName: z.string().min(2, {
    message: "Bayi adı en az 2 karakter olmalıdır.",
  }),
  amount: z.number().min(0.01, {
    message: "Tutar 0'dan büyük olmalıdır.",
  }),
  invoiceDate: z.date({
    required_error: "Fatura tarihi zorunludur.",
  }),
  status: z.enum(["Ödendi", "Beklemede", "İptal Edildi"], {
    message: "Geçerli bir durum seçiniz.",
  }),
});

interface AddInvoiceFormProps {
  onSuccess?: (newInvoice: z.infer<typeof formSchema> & { id: string }) => void;
}

export function AddInvoiceForm({ onSuccess }: AddInvoiceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: "",
      dealerName: "",
      amount: 0,
      invoiceDate: new Date(),
      status: "Beklemede",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newInvoiceId = `INV-${Date.now()}`;
    const newInvoice = { ...values, id: newInvoiceId };

    // Bayiyi bul ve bakiyesini güncelle
    const dealer = dummyDealers.find(d => d.name === values.dealerName);
    if (dealer) {
      // Fatura tutarı bakiyeden düşülür
      dealer.balance -= values.amount;

      // Yeni işlem kaydı oluştur
      const newTransaction: Transaction = {
        id: `TRN-${Date.now()}`,
        dealerId: dealer.id!, // Bayi ID'si mevcut olmalı
        type: "Fatura",
        amount: -values.amount, // Fatura olduğu için negatif tutar
        description: `${values.invoiceNumber} numaralı fatura`,
        date: values.invoiceDate,
      };
      dummyTransactions.push(newTransaction); // Global dummy listeye ekle

      showSuccess("Fatura başarıyla eklendi ve bayi bakiyesi güncellendi!");
      console.log("Yeni fatura verileri:", newInvoice);
      console.log("Güncellenmiş bayi bakiyesi:", dealer.name, dealer.balance);
    } else {
      showError(`Bayi "${values.dealerName}" bulunamadı. Fatura eklendi ancak bakiye güncellenemedi.`);
      console.warn("Yeni fatura verileri (bakiye güncellenmedi):", newInvoice);
    }
    
    form.reset();
    onSuccess?.(newInvoice);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="invoiceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fatura Numarası</FormLabel>
              <FormControl>
                <Input placeholder="INV-2024-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dealerName"
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tutar (₺)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1500.00"
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
          name="invoiceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fatura Tarihi</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Tarih seçin</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durum</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Durum Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ödendi">Ödendi</SelectItem>
                  <SelectItem value="Beklemede">Beklemede</SelectItem>
                  <SelectItem value="İptal Edildi">İptal Edildi</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Fatura Ekle</Button>
      </form>
    </Form>
  );
}