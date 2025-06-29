import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { DynamicPage, dummyDynamicPages } from "@/data/dummyPages";
import { useMemo } from "react";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır."),
  slug: z.string().min(3, "Slug en az 3 karakter olmalıdır.").regex(/^[a-z0-9-]+$/, "Slug sadece küçük harf, rakam ve tire içermelidir."),
  content: z.string().min(10, "İçerik en az 10 karakter olmalıdır."),
  parentId: z.string().nullable().optional(), // Nullable for main pages
  targetRole: z.enum(["admin", "dealer", "all"], {
    message: "Geçerli bir hedef rol seçiniz.",
  }),
});

interface AddEditPageFormProps {
  initialData?: DynamicPage;
  onSuccess?: (data: DynamicPage) => void;
}

export function AddEditPageForm({ initialData, onSuccess }: AddEditPageFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      content: "",
      parentId: null,
      targetRole: "all",
    },
  });

  // Mevcut ana sayfaları üst sayfa seçimi için al
  const mainPages = useMemo(() => {
    return dummyDynamicPages.filter(page => page.parentId === null && page.id !== initialData?.id);
  }, [initialData]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submittedData: DynamicPage = {
      ...values,
      id: initialData?.id || `PAGE-${Date.now()}`,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
      parentId: values.parentId === "" ? null : values.parentId, // Boş stringi null'a çevir
    };

    if (initialData?.id) {
      console.log("Dinamik sayfa güncellendi:", submittedData);
      showSuccess("Dinamik sayfa başarıyla güncellendi!");
    } else {
      console.log("Yeni dinamik sayfa eklendi:", submittedData);
      showSuccess("Dinamik sayfa başarıyla eklendi!");
    }
    form.reset();
    onSuccess?.(submittedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sayfa Başlığı</FormLabel>
              <FormControl>
                <Input placeholder="Sayfa Başlığı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
              <FormControl>
                <Input placeholder="sayfa-basligi" {...field} />
              </FormControl>
              <FormDescription>Sayfanın URL'sinde kullanılacak benzersiz isim (küçük harf, rakam ve tire).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İçerik</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Sayfa içeriği..."
                />
              </FormControl>
              <FormDescription>Sayfanın ana içeriği (HTML destekler).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Üst Sayfa (Opsiyonel)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Üst sayfa seçin (ana sayfa ise boş bırakın)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Ana Sayfa (Üst Sayfa Yok)</SelectItem>
                  {mainPages.map(page => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Bu sayfanın bir alt sayfası olmasını istiyorsanız bir üst sayfa seçin.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hedef Kitle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Hedef kitle seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">Tüm Kullanıcılar</SelectItem>
                  <SelectItem value="admin">Yöneticiler</SelectItem>
                  <SelectItem value="dealer">Bayiler</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Bu sayfanın hangi kullanıcı rolleri tarafından görülebileceğini belirleyin.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData?.id ? "Sayfayı Güncelle" : "Sayfa Ekle"}
        </Button>
      </form>
    </Form>
  );
}