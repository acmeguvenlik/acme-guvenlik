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
import { Textarea } from "@/components/ui/textarea";
import { dummyDealers } from "@/data/dummyDealers"; // dummyDealers import edildi
import { dummyTransactions, Transaction } from "@/data/dummyTransactions"; // dummyTransactions import edildi

// Dummy ürün listesi (şimdilik stok sayfasından alınmıştır, daha sonra API'den gelebilir)
const dummyProducts = [
  { id: "STK-001", name: "Güvenlik Kamerası", price: 899.99 },
  { id: "STK-002", name: "DVR Kayıt Cihazı", price: 1499.99 },
  { id: "STK-003", name: "Hareket Sensörü", price: 249.99 },
  { id: "STK-004", name: "Alarm Paneli", price: 1999.99 },
];

const formSchema = z.object({
  productId: z.string().min(1, {
    message: "Lütfen bir ürün seçiniz.",
  }),
  quantity: z.number().min(1, {
    message: "Miktar en az 1 olmalıdır.",
  }),
  notes: z.string().optional(),
});

interface AddOrderFormProps {
  onSuccess?: (newOrder: z.infer<typeof formSchema> & { id: string; productName: string; totalPrice: number; dealerId: string; dealerName: string; orderNumber: string; orderDate: Date; status: string; }) => void;
}

export function AddOrderForm({ onSuccess }: AddOrderFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedProduct = dummyProducts.find(p => p.id === values.productId);
    if (!selectedProduct) {
      showError("Seçilen ürün bulunamadı.");
      return;
    }

    const totalPrice = selectedProduct.price * values.quantity;
    const newOrderId = `ORD-${Date.now()}`;
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(dummyTransactions.length + 1).padStart(3, '0')}`; // Basit bir sipariş numarası

    // Bu formun bayi paneli için kullanıldığı varsayıldığından, şimdilik sabit bir bayi ID'si kullanıyoruz.
    // Gerçek uygulamada bu, giriş yapan bayinin ID'si olmalıdır.
    const currentDealerId = "D001"; 
    const currentDealer = dummyDealers.find(d => d.id === currentDealerId);

    if (!currentDealer) {
      showError("Giriş yapan bayi bilgisi bulunamadı. Sipariş oluşturulamadı.");
      return;
    }

    const newOrder = {
      id: newOrderId,
      orderNumber: orderNumber,
      productName: selectedProduct.name,
      quantity: values.quantity,
      totalPrice: totalPrice,
      orderDate: new Date(),
      status: "Beklemede", // Yeni sipariş varsayılan olarak beklemede
      dealerId: currentDealer.id!,
      dealerName: currentDealer.name,
      ...values,
    };

    // Bayi bakiyesini güncelle (sipariş bir borç oluşturur)
    currentDealer.balance -= totalPrice;

    // Yeni işlem kaydı oluştur
    const newTransaction: Transaction = {
      id: `TRN-${Date.now()}`,
      dealerId: currentDealer.id!,
      type: "Borç", // Sipariş olduğu için borç tipi
      amount: -totalPrice, // Borç olduğu için negatif tutar
      description: `${newOrder.orderNumber} numaralı sipariş (${selectedProduct.name} x ${values.quantity})`,
      date: new Date(),
    };
    dummyTransactions.push(newTransaction); // Global dummy listeye ekle

    showSuccess("Sipariş başarıyla oluşturuldu ve bayi bakiyesi güncellendi!");
    console.log("Yeni sipariş verileri:", newOrder);
    console.log("Güncellenmiş bayi bakiyesi:", currentDealer.name, currentDealer.balance);
    
    form.reset();
    onSuccess?.(newOrder);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ürün</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Ürün Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dummyProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} ({product.price.toFixed(2)} ₺)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Miktar</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notlar (Opsiyonel)</FormLabel>
              <FormControl>
                <Textarea placeholder="Ek notlar..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Sipariş Oluştur</Button>
      </form>
    </Form>
  );
}