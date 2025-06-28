import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ReceiptText, UserCog, DollarSign, TrendingUp, LineChart, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { SalesChart } from "@/components/reports/SalesChart";
import { dummyAnnouncements, Announcement } from "@/data/dummyAnnouncements"; // Duyurular import edildi
import { useAuth } from "@/context/AuthContext"; // useAuth import edildi
import { useEffect, useState } from "react";
import { format } from "date-fns";

// Dummy kullanıcı sayısı (gerçek uygulamada API'den gelir)
const dummyTotalUsers = 3; 

// Örnek rapor özet verileri (ReportsPage'den taşındı)
const totalSalesValue = 45231.89;
const totalOrders = 150;
const averageOrderValue = totalSalesValue / totalOrders;

const DashboardPage = () => {
  const { userRole } = useAuth();
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Admin veya tüm kullanıcılara yönelik son 3 duyuruyu filtrele
    const filtered = dummyAnnouncements
      .filter(ann => ann.targetRole === 'admin' || ann.targetRole === 'all')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
    setRecentAnnouncements(filtered);
  }, [userRole]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Yönetim Paneli - Acme Güvenlik</h1>
      <p className="text-gray-600">B2B sistemine hoş geldiniz. Buradan bayilerinizi, stoklarınızı ve finansal işlemlerinizi yönetebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Bayi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+20.1% geçen aydan</p>
            <Link to="/dealers" className="text-sm text-blue-600 hover:underline mt-2 block">Bayileri Yönet</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Stok Değeri</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺45,231.89</div>
            <p className="text-xs text-muted-foreground">+180.1% geçen aydan</p>
            <Link to="/stock" className="text-sm text-blue-600 hover:underline mt-2 block">Stokları Yönet</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Faturalar</CardTitle>
            <ReceiptText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-5% geçen aydan</p>
            <Link to="/invoices" className="text-sm text-blue-600 hover:underline mt-2 block">Faturaları Yönet</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyTotalUsers}</div>
            <p className="text-xs text-muted-foreground">Sistemdeki kayıtlı kullanıcı sayısı</p>
            <Link to="/users" className="text-sm text-blue-600 hover:underline mt-2 block">Kullanıcıları Yönet</Link>
          </CardContent>
        </Card>
      </div>

      {/* Duyurular Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Son Duyurular</CardTitle>
          <Megaphone className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {recentAnnouncements.length > 0 ? (
            <ul className="space-y-3">
              {recentAnnouncements.map((announcement) => (
                <li key={announcement.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-lg">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(announcement.createdAt, "dd.MM.yyyy HH:mm")} - Hedef: {announcement.targetRole === 'all' ? 'Tüm Kullanıcılar' : announcement.targetRole === 'admin' ? 'Yöneticiler' : 'Bayiler'}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Henüz duyuru bulunmamaktadır.</p>
          )}
          <div className="mt-4 text-right">
            <Link to="/announcements" className="text-sm text-blue-600 hover:underline">Tüm Duyuruları Gör</Link>
          </div>
        </CardContent>
      </Card>

      {/* Rapor Özet Kartları */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Rapor Özetleri</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Satış Değeri</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalSalesValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+15% geçen aydan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Sipariş Değeri</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+2% geçen aydan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş Adedi</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+10% geçen aydan</p>
          </CardContent>
        </Card>
      </div>

      {/* Satış Grafiği */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Aylık Satış ve Gelir Grafiği</h2>
      <SalesChart />
    </div>
  );
};

export default DashboardPage;