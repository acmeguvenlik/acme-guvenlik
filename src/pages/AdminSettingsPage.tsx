import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteSettingsForm } from "@/components/settings/SiteSettingsForm";
import { RegistrationSettingsForm } from "@/components/settings/RegistrationSettingsForm";
import { SeoSettingsForm } from "@/components/settings/SeoSettingsForm";
import { EmailSettingsForm } from "@/components/settings/EmailSettingsForm"; // Yeni import
import { IntegrationSettingsForm } from "@/components/settings/IntegrationSettingsForm"; // Yeni import
import { SecuritySettingsForm } from "@/components/settings/SecuritySettingsForm"; // Yeni import
import { SeoHead } from "@/components/seo/SeoHead";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const AdminSettingsPage = () => {
  return (
    <div className="space-y-6">
      <SeoHead title="Ayarlar" description="Uygulamanızın genel ayarlarını, kayıt ve SEO ayarlarını yönetin." />
      <h1 className="text-3xl font-bold">Ayarlar</h1>
      <p className="text-gray-600">Uygulamanızın genel ayarlarını buradan yönetin.</p>

      <Tabs defaultValue="site" className="w-full">
        <TabsList className="grid w-full grid-cols-6"> {/* grid-cols-3'ten grid-cols-6'ya güncellendi */}
          <TabsTrigger value="site">Site Ayarları</TabsTrigger>
          <TabsTrigger value="registration">Kayıt Ayarları</TabsTrigger>
          <TabsTrigger value="seo">SEO Ayarları</TabsTrigger>
          <TabsTrigger value="email">E-posta Ayarları</TabsTrigger> {/* Yeni sekme */}
          <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger> {/* Yeni sekme */}
          <TabsTrigger value="security">Güvenlik Ayarları</TabsTrigger> {/* Yeni sekme */}
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
            <CardContent className="space-y-4">
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
        {/* Yeni E-posta Ayarları Sekmesi */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>E-posta Ayarları</CardTitle>
              <CardDescription>
                Uygulamanızın e-posta gönderme (SMTP) ayarlarını yapılandırın.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <EmailSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        {/* Yeni Entegrasyon Ayarları Sekmesi */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Entegrasyon Ayarları</CardTitle>
              <CardDescription>
                Harici servisler için API anahtarları ve entegrasyon bilgilerini yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <IntegrationSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        {/* Yeni Güvenlik Ayarları Sekmesi */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
              <CardDescription>
                Uygulamanızın temel güvenlik politikalarını yapılandırın.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SecuritySettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage;