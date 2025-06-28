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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { FAQ } from "@/data/dummyFAQs";
import { RichTextEditor } from "@/components/editor/RichTextEditor";

const formSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(5, "Soru en az 5 karakter olmalıdır."),
  answer: z.string().min(10, "Cevap en az 10 karakter olmalıdır."),
  category: z.string().min(2, "Kategori en az 2 karakter olmalıdır."),
  targetRole: z.enum(["admin", "dealer", "all"], {
    message: "Geçerli bir hedef rol seçiniz.",
  }).default("all"),
});

interface AddFAQFormProps {
  initialData?: FAQ;
  onSuccess?: (data: FAQ) => void;
}

export function AddFAQForm({ initialData, onSuccess }: AddFAQFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      question: "",
      answer: "",
      category: "",
      targetRole: "all",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submittedData: FAQ = {
      ...values,
      id: initialData?.id || `FAQ-${Date.now()}`,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (initialData?.id) {
      console.log("SSS güncellendi:", submittedData);
      showSuccess("SSS başarıyla güncellendi!");
    } else {
      console.log("Yeni SSS eklendi:", submittedData);
      showSuccess("SSS başarıyla eklendi!");
    }
    form.reset();
    onSuccess?.(submittedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soru</FormLabel>
              <FormControl>
                <Input placeholder="Sıkça sorulan soru" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cevap</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Sorunun cevabı..."
                />
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
                <Input placeholder="Örn: Siparişler, Hesap, Destek" {...field} />
              </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "SSS Güncelle" : "SSS Ekle"}
        </Button>
      </form>
    </Form>
  );
}