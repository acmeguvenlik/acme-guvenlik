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
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";
import { BlogPost } from "@/data/dummyBlogPosts";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır."),
  slug: z.string().optional(), // Otomatik oluşturulabilir veya manuel girilebilir
  content: z.string().min(10, "İçerik en az 10 karakter olmalıdır."),
  author: z.string().min(2, "Yazar adı en az 2 karakter olmalıdır."),
  tags: z.string().optional(), // Virgülle ayrılmış string
  category: z.string().min(2, "Kategori en az 2 karakter olmalıdır."),
  imageUrl: z.string().url("Geçerli bir URL giriniz.").optional().or(z.literal('')),
});

interface AddBlogPostFormProps {
  initialData?: BlogPost;
  onSuccess?: (data: BlogPost) => void;
}

export function AddBlogPostForm({ initialData, onSuccess }: AddBlogPostFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      author: initialData?.author || "Acme Güvenlik Ekibi",
      tags: initialData?.tags?.join(", ") || "",
      category: initialData?.category || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const generatedSlug = values.slug || values.title.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

    const submittedData: BlogPost = {
      id: initialData?.id || `BLOG-${Date.now()}`,
      title: values.title,
      slug: generatedSlug,
      content: values.content,
      author: values.author,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [],
      category: values.category,
      imageUrl: values.imageUrl || undefined,
    };

    if (initialData?.id) {
      console.log("Blog yazısı güncellendi:", submittedData);
      showSuccess("Blog yazısı başarıyla güncellendi!");
    } else {
      console.log("Yeni blog yazısı eklendi:", submittedData);
      showSuccess("Blog yazısı başarıyla eklendi!");
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
              <FormLabel>Başlık</FormLabel>
              <FormControl>
                <Input placeholder="Blog yazısının başlığı" {...field} />
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
              <FormLabel>URL Slug (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="benzersiz-url-ismi" {...field} />
              </FormControl>
              <FormDescription>Boş bırakılırsa başlıktan otomatik oluşturulur.</FormDescription>
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
                <Textarea placeholder="Blog yazısının içeriği..." rows={10} {...field} />
              </FormControl>
              <FormDescription>HTML içeriği desteklenir.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yazar</FormLabel>
              <FormControl>
                <Input placeholder="Yazar Adı" {...field} />
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
                <Input placeholder="Teknoloji, Güvenlik, İpuçları vb." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etiketler (Virgülle Ayırın)</FormLabel>
              <FormControl>
                <Input placeholder="etiket1, etiket2, etiket3" {...field} />
              </FormControl>
              <FormDescription>Yazıyı tanımlayan anahtar kelimeler.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Görsel URL'si (Opsiyonel)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/gorsel.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "Yazıyı Güncelle" : "Yazı Ekle"}
        </Button>
      </form>
    </Form>
  );
}