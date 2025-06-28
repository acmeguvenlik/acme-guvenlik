import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Truck, ReceiptText, User, Megaphone, TicketIcon, Rss } from "lucide-react"; // Rss iconu import edildi
import { Link } from "react-router-dom";
import { dummyAnnouncements, Announcement } from "@/data/dummyAnnouncements";
import { dummyTickets, Ticket } from "@/data/dummyTickets";
import { dummyBlogPosts, BlogPost } from "@/data/dummyBlogPosts"; // dummyBlogPosts import edildi
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const DealerDashboardPage = () => {
  const { userRole } = useAuth();
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [recentBlogPosts, setRecentBlogPosts] = useState<BlogPost[]>([]); // Yeni state

  // Gerçek uygulamada, bu kısım giriş yapan bayinin ID'sine göre filtrelenmelidir.
  const currentDealerId = "D001"; // Örnek olarak sabit bir bayi ID'si

  useEffect(() => {
    // Bayi veya tüm kullanıcılara yönelik son 3 duyuruyu filtrele
    const filteredAnnouncements = dummyAnnouncements
      .filter(ann => ann.targetRole === 'dealer' || ann.targetRole === 'all')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
    setRecentAnnouncements(filteredAnnouncements);

    // Bayiye ait son 3 açık veya yanıtlanmış destek talebini filtrele
    const filteredTickets = dummyTickets
      .filter(ticket => ticket.dealerId === currentDealerId && (ticket.status === 'Açık' || ticket.status === 'Yanıtlandı'))
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 3);
    setRecentTickets(filteredTickets);

    // Son 3 blog yazısını filtrele
    const filteredBlogPosts = dummyBlogPosts
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
    setRecentBlogPosts(filteredBlogPosts);
  }, [userRole, currentDealerId]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bayi Paneli - Acme Güvenlik</h1>
      <p className="text-gray-600">Bayi sistemine hoş geldiniz. Buradan siparişlerinizi ve stok durumunuzu takip edebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Siparişler</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Yeni siparişleriniz var</p>
            <Link to="/dealer-orders" className="text-sm text-blue-600 hover:underline">Tüm siparişleri gör</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stoktaki Ürünler</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Toplam farklı ürün çeşidi</p>
            <Link to="/dealer-stock" className="text-sm text-blue-600 hover:underline">Ürün kataloğunu gör</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Faturalar</CardTitle>
            <ReceiptText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Ödenmemiş faturalarınız var</p>
            <Link to="/dealer-invoices" className="text-sm text-blue-600 hover:underline">Tüm faturaları gör</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profil Bilgileri</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Güncelle</div>
            <p className="text-xs text-muted-foreground">Kişisel bilgilerinizi yönetin</p>
            <Link to="/dealer-profile" className="text-sm text-blue-600 hover:underline">Profilimi düzenle</Link>
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
          {/* Bayi paneli için tüm duyuruları görme linki şimdilik yok, admin paneline yönlendirme yapılabilir veya ayrı bir sayfa eklenebilir. */}
        </CardContent>
      </Card>

      {/* Son Destek Talepleri Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Son Destek Taleplerim</CardTitle>
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
                    {format(ticket.updatedAt, "dd.MM.yyyy HH:mm")} - Durum: {ticket.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Henüz açık veya yanıtlanmış destek talebiniz bulunmamaktadır.</p>
          )}
          <div className="mt-4 text-right">
            <Link to="/dealer-tickets" className="text-sm text-blue-600 hover:underline">Tüm Taleplerimi Gör</Link>
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
    </div>
  );
};

export default DealerDashboardPage;