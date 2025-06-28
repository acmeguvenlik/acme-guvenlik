import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteSettingsForm } from "@/components/settings/SiteSettingsForm";
import { RegistrationSettingsForm } from "@/components/settings/RegistrationSettingsForm";
import { SeoSettingsForm } from "@/components/settings/SeoSettingsForm";

const AdminSettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ayarlar</h1>
      <p className="text-gray-600">Uygulamanızın genel ayarlarını buradan yönetin.</p>

      <Tabs defaultValue="site" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="site">Site Ayarları</TabsTrigger>
          <TabsTrigger value="registration">Kayıt Ayarları</TabsTrigger>
          <TabsTrigger value="seo">SEO Ayarları</TabsTrigger>
        </TabsList>
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Ayarları</CardTitle>
              <CardDescription>
                Uygulamanızın genel bilgilerini ve iletişim detaylarını güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SiteSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="registration">
          <Card>
            <CardHeader>
              <CardTitle>Kayıt Ayarları</CardTitle>
              <CardDescription>
                Kullanıcı kayıt süreçleri ve varsayılan rollerle ilgili ayarları yapılandırın.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RegistrationSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Ayarları</CardTitle>
              <CardDescription>
                Arama motoru optimizasyonu için meta etiketlerini ve diğer ayarları düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SeoSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage;