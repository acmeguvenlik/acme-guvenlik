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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Kullanıcı adı boş bırakılamaz.",
  }),
  password: z.string().min(1, {
    message: "Şifre boş bırakılamaz.",
  }),
});

const LoginPage = () => {
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.username, values.password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <SeoHead title="Giriş Yap" description="Acme Güvenlik Yönetim Paneli'ne giriş yapın." />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Giriş Yap</CardTitle>
          <CardDescription>Yönetim paneline erişmek için giriş yapın.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kullanıcı Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="admin veya dealer" {...field} />
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
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="admin veya dealer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Giriş Yap</Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Test için kullanıcı adı: <code className="font-semibold">admin</code>, şifre: <code className="font-semibold">admin</code>
          </p>
          <p className="text-sm text-center text-muted-foreground">
            Test için kullanıcı adı: <code className="font-semibold">dealer</code>, şifre: <code className="font-semibold">dealer</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;