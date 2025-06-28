import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AddBlogPostForm } from "@/components/blog/AddBlogPostForm";
import { dummyBlogPosts, BlogPost } from "@/data/dummyBlogPosts";
import { showSuccess } from "@/utils/toast";

const AddBlogPostPage = () => {
  const navigate = useNavigate();

  const handleAddBlogPostSuccess = (newPost: BlogPost) => {
    dummyBlogPosts.push(newPost); // Dummy veriye yeni yazıyı ekle
    showSuccess("Blog yazısı başarıyla eklendi!");
    navigate("/blog"); // Ekleme sonrası blog listesine geri dön
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Yeni Blog Yazısı Ekle</h1>
        <Link to="/blog">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Yazılara Dön
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Yeni bir blog yazısı oluşturmak için aşağıdaki formu doldurun.</p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Yeni Yazı Oluştur</CardTitle>
          <CardDescription>
            Blogunuza yeni bir içerik ekleyin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddBlogPostForm onSuccess={handleAddBlogPostSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlogPostPage;