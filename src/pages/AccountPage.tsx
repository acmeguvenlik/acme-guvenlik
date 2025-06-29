import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AccountSettingsForm } from "@/components/account/AccountSettingsForm";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

const AccountPage = () => {
  const { userRole } = useAuth();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (userRole === 'admin') {
      setUserEmail("admin@acme.com");
    } else if (userRole === 'dealer') {
      setUserEmail("dealer@acme.com");
    } else {
      setUserEmail("guest@acme.com");
    }
  }, [userRole]);

  const handleSaveAccountSettings = (email: string, newPassword?: string) => {
    console.log("Kullanıcı e-postası güncellendi:", email);
    if (newPassword) {
      console.log("Kullanıcı şifresi güncellendi.");
    }
    setUserEmail(email);
  };

  return (
    <div className="space-y-6">
      <SeoHead title="Hesap Ayarları" description="Kişisel hesap bilgilerinizi ve şifrenizi yönetin." />
      <h1 className="text-3xl font-bold">Hesap Ayarları</h1>
      <p className="text-gray-600 dark:text-gray-400">Kişisel hesap bilgilerinizi ve şifrenizi buradan yönetin.</p>

      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Hesap Bilgileri</CardTitle>
          <CardDescription>E-posta adresinizi ve şifrenizi güncelleyin.</CardDescription>
        </CardHeader>
        <CardContent>
          {userEmail && <AccountSettingsForm initialEmail={userEmail} onSave={handleSaveAccountSettings} />}
          <div className="mt-6 pt-4 border-t">
            <h3 className="text-lg font-semibold mb-2">Tema Ayarları</h3>
            <p className="text-sm text-muted-foreground mb-4">Uygulamanın görünümünü buradan değiştirebilirsiniz.</p>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;