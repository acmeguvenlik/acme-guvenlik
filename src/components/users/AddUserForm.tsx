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

const formSchema = z.object({
  id: z.string().optional(), // Düzenleme için id
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır.").optional().or(z.literal('')), // Yeni kullanıcı için zorunlu, düzenleme için opsiyonel
  role: z.enum(["admin", "dealer", "viewer"], {
    message: "Geçerli bir rol seçiniz.",
  }).default("dealer"),
});

export type UserFormData = z.infer<typeof formSchema>;

interface AddUserFormProps {
  initialData?: UserFormData;
  onSuccess?: (data: UserFormData) => void;
}

export function AddUserForm({ initialData, onSuccess }: AddUserFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      username: "",
      email: "",
      password: "",
      role: "dealer",
    },
  });

  function onSubmit(values: UserFormData) {
    if (initialData?.id) {
      console.log("Kullanıcı güncellendi:", values);
      showSuccess("Kullanıcı başarıyla güncellendi!");
    } else {
      console.log("Yeni kullanıcı eklendi:", values);
      showSuccess("Kullanıcı başarıyla eklendi!");
    }
    form.reset();
    onSuccess?.(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kullanıcı Adı</FormLabel>
              <FormControl>
                <Input placeholder="kullaniciadi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input type="email" placeholder="kullanici@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre {initialData?.id ? "(Değiştirmek istemiyorsanız boş bırakın)" : ""}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={initialData?.id ? "Yeni şifre" : "Şifre"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Rol Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="dealer">Bayi</SelectItem>
                  <SelectItem value="viewer">Görüntüleyici</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData?.id ? "Kullanıcıyı Güncelle" : "Kullanıcı Ekle"}
        </Button>
      </form>
    </Form>
  );
}