import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ReceiptText, UserCog, DollarSign, TrendingUp, LineChart, Megaphone, TicketIcon, Rss } from "lucide-react"; // Rss iconu import edildi
import { Link } from "react-router-dom";
import { SalesChart } from "@/components/reports/SalesChart";
import { dummyAnnouncements, Announcement } from "@/data/dummyAnnouncements";
import { dummyTickets, Ticket } from "@/data/dummyTickets";
import { dummyBlogPosts, BlogPost } from "@/data/dummyBlogPosts"; // dummyBlogPosts import edildi
import { useAuth } from "@/context/AuthContext";
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
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [recentBlogPosts, setRecentBlogPosts] = useState<BlogPost[]>([]); // Yeni state

  useEffect(() => {
    // Admin veya tüm kullanıcılara yönelik son 3 duyuruyu filtrele
    const filteredAnnouncements = dummyAnnouncements
      .filter(ann => ann.targetRole === 'admin' || ann.targetRole === 'all')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
    setRecentAnnouncements(filteredAnnouncements);

    // Son 3 açık veya yanıtlanmış destek talebini filtrele
    const filteredTickets = dummyTickets
      .filter(ticket => ticket.status === 'Açık' || ticket.status === 'Yanıtlandı')
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 3);
    setRecentTickets(filteredTickets);

    // Son 3 blog yazısını filtrele
    const filteredBlogPosts = dummyBlogPosts
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
    setRecentBlogPosts(filteredBlogPosts);
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

      {/* Son Destek Talepleri Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Son Destek Talepleri</CardTitle>
          <TicketIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {recentTickets.length > 0 ? (
            <ul className="space-y-3">
              {recentTickets.map((ticket) => (
                <li key={ticket.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-lg">
                    <Link to={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline">
                      {ticket.subject}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(ticket.updatedAt, "dd.MM.yyyy HH:mm")} - Durum: {ticket.status} - Bayi: {ticket.dealerName}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Henüz açık veya yanıtlanmış destek talebi bulunmamaktadır.</p>
          )}
          <div className="mt-4 text-right">
            <Link to="/admin-tickets" className="text-sm text-blue-600 hover:underline">Tüm Talepleri Yönet</Link>
          </div>
        </CardContent>
      </Card>

      {/* Son Blog Yazıları Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Son Blog Yazıları</CardTitle>
          <Rss className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {recentBlogPosts.length > 0 ? (
            <ul className="space-y-3">
              {recentBlogPosts.map((post) => (
                <li key={post.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-lg">
                    <Link to={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(post.createdAt, "dd.MM.yyyy")} - {post.author}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Henüz blog yazısı bulunmamaktadır.</p>
          )}
          <div className="mt-4 text-right">
            <Link to="/blog" className="text-sm text-blue-600 hover:underline">Tüm Blog Yazılarını Gör</Link>
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