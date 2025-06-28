import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, Tag, Edit, Trash2 } from "lucide-react"; // Edit ve Trash2 import edildi
import { dummyBlogPosts } from "@/data/dummyBlogPosts";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext"; // useAuth hook'unu import et
import { showSuccess } from "@/utils/toast"; // showSuccess toast'u import edildi

const BlogPostDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { userRole } = useAuth(); // Kullanıcı rolünü al
  const [post, setPost] = useState(dummyBlogPosts.find(p => p.slug === slug)); // Postu state olarak yönet

  // dummyBlogPosts'ta dışarıdan bir değişiklik olduğunda state'i güncellemek için
  // (gerçek bir uygulamada bu bir API çağrısı veya global state yönetimi ile yapılırdı)
  useEffect(() => {
    setPost(dummyBlogPosts.find(p => p.slug === slug));
  }, [slug, dummyBlogPosts]); // dummyBlogPosts referansı değişirse (örneğin yeni bir dizi atanırsa) tetiklenir

  const handleDeleteBlogPost = () => {
    if (!post) return;
    if (window.confirm(`"${post.title}" başlıklı blog yazısını silmek istediğinizden emin misiniz?`)) {
      const index = dummyBlogPosts.findIndex(p => p.id === post.id);
      if (index !== -1) {
        dummyBlogPosts.splice(index, 1);
        showSuccess("Blog yazısı başarıyla silindi!");
        navigate("/blog"); // Silme sonrası blog listesine geri dön
      }
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Yazısı Bulunamadı</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Aradığınız blog yazısı mevcut değil.</p>
          <Link to="/blog" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 underline">
            Tüm Blog Yazılarına Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex items-center space-x-2">
          {userRole === 'admin' && ( // Sadece admin rolü için düzenleme ve silme butonları
            <>
              <Link to={`/blog/edit/${post.id}`}> {/* Düzenleme sayfasına yönlendirme */}
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" /> Düzenle
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleDeleteBlogPost}>
                <Trash2 className="h-4 w-4 mr-2" /> Sil
              </Button>
            </>
          )}
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tüm Yazılara Dön
            </Button>
          </Link>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Blog yazısının detaylı içeriği.</p>

      <Card>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-t-lg"
            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x400?text=Görsel+Yok"; }}
          />
        )}
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center text-sm text-muted-foreground mt-2">
            <User className="h-4 w-4 mr-1" /> {post.author}
            <CalendarDays className="h-4 w-4 ml-4 mr-1" /> {format(post.createdAt, "dd.MM.yyyy HH:mm")}
            <span className="ml-4">Kategori: <span className="font-semibold">{post.category}</span></span>
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                <Tag className="inline-block h-3 w-3 mr-1" /> {tag}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPostDetailPage;