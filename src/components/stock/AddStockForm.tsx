import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";
import { Product } from "@/data/dummyProducts";

const formSchema = z.object({
  id: z.string().optional(),
  productCode: z.string().min(3, "Stok kodu en az 3 karakter olmalıdır"),
  productName: z.string().min(2, "Ürün adı en az 2 karakter olmalıdır"),
  category: z.string().min(2, "Kategori en az 2 karakter olmalıdır"),
  quantity: z.number().min(0, "Adet negatif olamaz"),
  price: z.number().min(0, "Fiyat negatif olamaz"),
  description: z.string().optional(),
  imageUrls: z.string().optional(), // Virgülle ayrılmış URL'ler için string
  variants: z.string().optional(), // Varyant açıklaması için string
  supplierName: z.string().optional(), // Tedarikçi adı
  supplierContactPerson: z.string().optional(), // Tedarikçi yetkili kişi
  supplierPhone: z.string().optional(), // Tedarikçi telefon
  supplierEmail: z.string().email("Geçerli bir e-posta adresi giriniz.").optional().or(z.literal('')), // Tedarikçi e-posta
  metaTitle: z.string().optional(), // SEO Meta Başlığı
  metaDescription: z.string().optional(), // SEO Meta Açıklaması
  keywords: z.string().optional(), // SEO Anahtar Kelimeler
});

interface AddStockFormProps {
  initialData?: Product;
  onSuccess?: (data: Product) => void;
}

export function AddStockForm({ initialData, onSuccess }: AddStockFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productCode: initialData?.productCode || "",
      productName: initialData?.productName || "",
      category: initialData?.category || "",
      quantity: initialData?.quantity || 0,
      price: initialData?.price || 0,
      description: initialData?.description || "",
      imageUrls: initialData?.imageUrls?.join(", ") || "", // Diziyi stringe çevir
      variants: initialData?.variants || "",
      supplierName: initialData?.supplier?.name || "",
      supplierContactPerson: initialData?.supplier?.contactPerson || "",
      supplierPhone: initialData?.supplier?.phone || "",
      supplierEmail: initialData?.supplier?.email || "",
      metaTitle: initialData?.seo?.metaTitle || "",
      metaDescription: initialData?.seo?.metaDescription || "",
      keywords: initialData?.seo?.keywords || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const processedData: Product = {
      id: initialData?.id || `STK-${Date.now()}`,
      productCode: values.productCode,
      productName: values.productName,
      category: values.category,
      quantity: values.quantity,
      price: values.price,
      description: values.description || undefined,
      imageUrls: values.imageUrls ? values.imageUrls.split(',').map(url => url.trim()).filter(url => url !== '') : undefined,
      variants: values.variants || undefined,
      supplier: (values.supplierName || values.supplierContactPerson || values.supplierPhone || values.supplierEmail) ? {
        name: values.supplierName || "",
        contactPerson: values.supplierContactPerson || undefined,
        phone: values.supplierPhone || undefined,
        email: values.supplierEmail || undefined,
      } : undefined,
      seo: (values.metaTitle || values.metaDescription || values.keywords) ? {
        metaTitle: values.metaTitle || undefined,
        metaDescription: values.metaDescription || undefined,
        keywords: values.keywords || undefined,
      } : undefined,
    };

    if (initialData?.id) {
      console.log("Stok güncellendi:", processedData);
      showSuccess("Stok başarıyla güncellendi!");
    } else {
      console.log("Yeni stok:", processedData);
      showSuccess("Stok başarıyla eklendi!");
    }
    form.reset();
    onSuccess?.(processedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-lg font-semibold mb-2">Genel Bilgiler</h3>
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

        <h3 className="text-lg font-semibold mt-6 mb-2">Envanter ve Fiyatlandırma</h3>
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

        <h3 className="text-lg font-semibold mt-6 mb-2">Açıklama ve Medya</h3>
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
          name="imageUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Görsel URL'leri (Virgülle Ayırın, Opsiyonel)</FormLabel>
              <FormControl>
                <Textarea placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" {...field} />
              </FormControl>
              <FormDescription>Birden fazla görsel için URL'leri virgül ile ayırın.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Varyantlar (Opsiyonel)</FormLabel>
              <FormControl>
                <Textarea placeholder="Örn: Renk: Kırmızı, Mavi; Boyut: S, M, L" {...field} />
              </FormControl>
              <FormDescription>Ürün varyantlarını açıklayın (örn: Renk: Kırmızı, Mavi).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">Tedarikçi Bilgileri</h3>
        <FormField
          control={form.control}
          name="supplierName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tedarikçi Adı (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="ABC Tedarik" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplierContactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tedarikçi Yetkili Kişi (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="Ayşe Yılmaz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplierPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tedarikçi Telefon (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="5551234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplierEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tedarikçi E-posta (Opsiyonel)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tedarikci@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">SEO Ayarları</h3>
        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Başlığı (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="Ürün için SEO başlığı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Açıklaması (Opsiyonel)</FormLabel>
              <FormControl>
                <Textarea placeholder="Ürün için SEO açıklaması" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anahtar Kelimeler (Virgülle Ayırın, Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="ürün, anahtar, kelimeler" {...field} />
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