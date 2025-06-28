import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AccountSettingsForm } from "@/components/account/AccountSettingsForm";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

const AccountPage = () => {
  const { userRole } = useAuth();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Gerçek uygulamada bu kısım API'den kullanıcının e-postasını çeker.
    // Şimdilik dummy bir e-posta kullanıyoruz.
    if (userRole === 'admin') {
      setUserEmail("admin@acme.com");
    } else if (userRole === 'dealer') {
      setUserEmail("dealer@acme.com");
    } else {
      setUserEmail("guest@acme.com");
    }
  }, [userRole]);

  const handleSaveAccountSettings = (email: string, newPassword?: string) => {
    // Burada e-posta ve/veya şifre güncelleme işlemleri backend'e gönderilir.
    console.log("Kullanıcı e-postası güncellendi:", email);
    if (newPassword) {
      console.log("Kullanıcı şifresi güncellendi.");
    }
    setUserEmail(email); // UI'da e-postayı güncelle
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hesap Ayarları</h1>
      <p className="text-gray-600 dark:text-gray-400">Kişisel hesap bilgilerinizi ve şifrenizi buradan yönetin.</p>

      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Hesap Bilgileri</CardTitle>
          <CardDescription>E-posta adresinizi ve şifrenizi güncelleyin.</CardDescription>
        </CardHeader>
        <CardContent>
          {userEmail && <AccountSettingsForm initialEmail={userEmail} onSave={handleSaveAccountSettings} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;