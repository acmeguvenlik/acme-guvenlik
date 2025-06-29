import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteSettingsForm } from "@/components/settings/SiteSettingsForm";
import { RegistrationSettingsForm } from "@/components/settings/RegistrationSettingsForm";
import { SeoSettingsForm } from "@/components/settings/SeoSettingsForm";
import { SeoHead } from "@/components/seo/SeoHead";
import { Button } from "@/components/ui/button"; // Button import edildi
import { ExternalLink } from "lucide-react"; // ExternalLink iconu import edildi

const AdminSettingsPage = () => {
  return (
    <div className="space-y-6">
      <SeoHead title="Ayarlar" description="Uygulamanızın genel ayarlarını, kayıt ve SEO ayarlarını yönetin." />
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
            <CardContent className="space-y-4"> {/* space-y-4 eklendi */}
              <SeoSettingsForm />
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-2">Site Haritası</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Arama motorlarının sitenizi daha iyi taraması için site haritası dosyanızı görüntüleyin.
                  Dinamik içerik güncellemeleri için bu dosyanın manuel olarak veya bir derleme betiği ile güncellenmesi gerekebilir.
                </p>
                <Button asChild variant="outline">
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Site Haritasını Görüntüle
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage;