import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Truck, ReceiptText, User, Megaphone, TicketIcon, Rss } from "lucide-react";
import { Link } from "react-router-dom";
import { dummyAnnouncements, Announcement } from "@/data/dummyAnnouncements";
import { dummyTickets, Ticket } from "@/data/dummyTickets";
import { dummyBlogPosts, BlogPost } from "@/data/dummyBlogPosts";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { SeoHead } from "@/components/seo/SeoHead";
import { useTranslation } from "react-i18next"; // useTranslation hook'u eklendi

const DealerDashboardPage = () => {
  const { userRole } = useAuth();
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [recentBlogPosts, setRecentBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation(); // useTranslation hook'unu kullan

  const currentDealerId = "D001";

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filteredAnnouncements = dummyAnnouncements
        .filter(ann => ann.targetRole === 'dealer' || ann.targetRole === 'all')
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 3);
      setRecentAnnouncements(filteredAnnouncements);

      const filteredTickets = dummyTickets
        .filter(ticket => ticket.dealerId === currentDealerId && (ticket.status === 'Açık' || ticket.status === 'Yanıtlandı'))
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, 3);
      setRecentTickets(filteredTickets);

      const filteredBlogPosts = dummyBlogPosts
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 3);
      setRecentBlogPosts(filteredBlogPosts);

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userRole, currentDealerId]);

  return (
    <div className="space-y-6">
      <SeoHead title={t("sidebar.dealerPanel")} description={t("common.welcomeMessageDealer")} />
      <h1 className="text-3xl font-bold">{t("sidebar.dealerPanel")} - Acme Güvenlik</h1>
      <p className="text-gray-600">{t("common.welcomeMessageDealer")}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-2/3 mb-2" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dealerDashboard.pendingOrders")}</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Yeni siparişleriniz var</p>
                <Link to="/dealer-orders" className="text-sm text-blue-600 hover:underline">{t("sidebar.myOrders")}</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dealerDashboard.productsInStock")}</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150</div>
                <p className="text-xs text-muted-foreground">Toplam farklı ürün çeşidi</p>
                <Link to="/dealer-stock" className="text-sm text-blue-600 hover:underline">{t("sidebar.productCatalog")}</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dealerDashboard.pendingInvoices")}</CardTitle>
                <ReceiptText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Ödenmemiş faturalarınız var</p>
                <Link to="/dealer-invoices" className="text-sm text-blue-600 hover:underline">{t("sidebar.myInvoices")}</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dealerDashboard.profileInformation")}</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Güncelle</div>
                <p className="text-xs text-muted-foreground">Kişisel bilgilerinizi yönetin</p>
                <Link to="/dealer-profile" className="text-sm text-blue-600 hover:underline">{t("sidebar.myProfile")}</Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Duyurular Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">{t("dashboard.recentAnnouncements")}</CardTitle>
          <Megaphone className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-6 w-3/4 mt-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ) : recentAnnouncements.length > 0 ? (
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
        </CardContent>
      </Card>

      {/* Son Destek Talepleri Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">{t("dashboard.recentSupportTickets")}</CardTitle>
          <TicketIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-6 w-3/4 mt-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ) : recentTickets.length > 0 ? (
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
            <Link to="/dealer-tickets" className="text-sm text-blue-600 hover:underline">{t("sidebar.mySupportTickets")}</Link>
          </div>
        </CardContent>
      </Card>

      {/* Son Blog Yazıları Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">{t("dashboard.recentBlogPosts")}</CardTitle>
          <Rss className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-6 w-3/4 mt-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ) : recentBlogPosts.length > 0 ? (
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
            <Link to="/blog" className="text-sm text-blue-600 hover:underline">{t("sidebar.blog")}</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerDashboardPage;