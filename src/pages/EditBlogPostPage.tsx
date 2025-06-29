import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { dummyBlogPosts, BlogPost } from "@/data/dummyBlogPosts";
import { AddBlogPostForm } from "@/components/blog/AddBlogPostForm";
import { showSuccess } from "@/utils/toast";
import { useState, useEffect } from "react";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

const EditBlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);

  useEffect(() => {
    const foundPost = dummyBlogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate("/not-found");
    }
  }, [id, navigate]);

  const handleSaveBlogPost = (updatedData: BlogPost) => {
    const postIndex = dummyBlogPosts.findIndex(p => p.id === updatedData.id);
    if (postIndex !== -1) {
      dummyBlogPosts[postIndex] = updatedData;
      showSuccess("Blog yazısı başarıyla güncellendi!");
      navigate("/blog");
    } else {
      console.error("Blog yazısı bulunamadı, güncelleme yapılamadı.");
      navigate("/blog");
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="space-y-6">
      <SeoHead title={`Blog Yazısını Düzenle: ${post.title}`} description={`"${post.title}" başlıklı blog yazısını düzenleyin.`} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Yazısını Düzenle: {post.title}</h1>
        <Link to="/blog">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Yazılara Dön
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Blog yazısı bilgilerini buradan güncelleyebilirsiniz.</p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Yazı Bilgilerini Düzenle</CardTitle>
          <CardDescription>
            Yazı ID: {post.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddBlogPostForm initialData={post} onSuccess={handleSaveBlogPost} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlogPostPage;