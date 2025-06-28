import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Textarea import edildi
import { showSuccess } from "@/utils/toast";
import { Product } from "@/data/dummyProducts"; // Product tipi import edildi

const formSchema = z.object({
  id: z.string().optional(), // Düzenleme için id eklendi
  productCode: z.string().min(3, "Stok kodu en az 3 karakter olmalıdır"),
  productName: z.string().min(2, "Ürün adı en az 2 karakter olmalıdır"),
  category: z.string().min(2, "Kategori en az 2 karakter olmalıdır"),
  quantity: z.number().min(0, "Adet negatif olamaz"), // Adet 0 olabilir (stokta yok)
  price: z.number().min(0, "Fiyat negatif olamaz"),
  description: z.string().optional(), // Yeni: Açıklama alanı
  imageUrl: z.string().url("Geçerli bir URL giriniz.").optional().or(z.literal('')), // Yeni: Görsel URL alanı
});

interface AddStockFormProps {
  initialData?: Product; // Düzenleme için başlangıç verileri
  onSuccess?: (data: Product) => void;
}

export function AddStockForm({ initialData, onSuccess }: AddStockFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      productCode: "",
      productName: "",
      category: "",
      quantity: 0,
      price: 0,
      description: "",
      imageUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (initialData?.id) {
      console.log("Stok güncellendi:", values);
      showSuccess("Stok başarıyla güncellendi!");
    } else {
      console.log("Yeni stok:", values);
      showSuccess("Stok başarıyla eklendi!");
    }
    form.reset();
    onSuccess?.(values as Product); // Callback'i Product tipiyle çağır
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="productCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stok Kodu</FormLabel>
              <FormControl>
                <Input placeholder="STK-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ürün Adı</FormLabel>
              <FormControl>
                <Input placeholder="Güvenlik Kamerası" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Input placeholder="Kamera" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adet</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="100" 
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birim Fiyat (₺)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="899.99" 
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
              <FormLabel>Açıklama (Opsiyonel)</FormLabel>
              <FormControl>
                <Textarea placeholder="Ürün hakkında detaylı bilgi..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Görsel URL (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData?.id ? "Stok Güncelle" : "Stok Ekle"}
        </Button>
      </form>
    </Form>
  );
}