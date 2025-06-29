import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { dummyDynamicPages, DynamicPage } from "@/data/dummyPages";
import { useAuth } from "@/context/AuthContext";
import { SeoHead } from "@/components/seo/SeoHead";

const DynamicPageDisplayPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [page, setPage] = useState<DynamicPage | undefined>(undefined);
  const [breadcrumbs, setBreadcrumbs] = useState<{ title: string; slug?: string }[]>([]);
  const [subPages, setSubPages] = useState<DynamicPage[]>([]);

  useEffect(() => {
    const foundPage = dummyDynamicPages.find(p => p.slug === slug);

    if (!foundPage) {
      navigate("/not-found");
      return;
    }

    // Rol kontrolü
    if (foundPage.targetRole === 'admin' && userRole !== 'admin') {
      navigate("/unauthorized"); // Yetkisiz erişim sayfası veya ana sayfaya yönlendir
      return;
    }
    if (foundPage.targetRole === 'dealer' && userRole !== 'dealer' && userRole !== 'admin') {
      navigate("/unauthorized"); // Yetkisiz erişim sayfası veya ana sayfaya yönlendir
      return;
    }

    setPage(foundPage);

    // Breadcrumbs oluştur
    const newBreadcrumbs: { title: string; slug?: string }[] = [];
    let currentPage: DynamicPage | undefined = foundPage;
    while (currentPage) {
      newBreadcrumbs.unshift({ title: currentPage.title, slug: currentPage.slug });
      currentPage = currentPage.parentId ? dummyDynamicPages.find(p => p.id === currentPage?.parentId) : undefined;
    }
    setBreadcrumbs(newBreadcrumbs);

    // Alt sayfaları bul
    const foundSubPages = dummyDynamicPages.filter(p => p.parentId === foundPage.id && (p.targetRole === 'all' || p.targetRole === userRole));
    setSubPages(foundSubPages);

  }, [slug, userRole, navigate]);

  if (!page) {
    return null; // Yönlendirme yapıldıysa veya sayfa bulunamadıysa render etme
  }

  return (
    <div className="space-y-6">
      <SeoHead
        title={page.title}
        description={page.content.replace(/<[^>]*>?/gm, '').substring(0, 160)}
        canonicalUrl={`${window.location.origin}/pages/${page.slug}`}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{page.title}</h1>
        <Link to={userRole === 'admin' ? "/admin-pages" : (userRole === 'dealer' ? "/dealer-dashboard" : "/")}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {userRole === 'admin' ? "Sayfa Yönetimine Dön" : "Geri Dön"}
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Dinamik sayfa içeriği.</p>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{page.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Link to="/" className="text-blue-600 hover:underline flex items-center">
                <Home className="h-3 w-3 mr-1" /> Ana Sayfa
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <span key={index}>
                  <span> / </span>
                  {crumb.slug ? (
                    <Link to={`/pages/${crumb.slug}`} className="text-blue-600 hover:underline">
                      {crumb.title}
                    </Link>
                  ) : (
                    <span>{crumb.title}</span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-2">Hedef Kitle: {page.targetRole === 'all' ? 'Tüm Kullanıcılar' : page.targetRole === 'admin' ? 'Yöneticiler' : 'Bayiler'}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </CardContent>
      </Card>

      {subPages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Alt Sayfalar</CardTitle>
            <CardDescription>Bu sayfanın altındaki diğer sayfalar.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {subPages.map(subPage => (
                <li key={subPage.id}>
                  <Link to={`/pages/${subPage.slug}`} className="text-blue-600 hover:underline text-lg font-medium">
                    {subPage.title}
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2">{subPage.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DynamicPageDisplayPage;