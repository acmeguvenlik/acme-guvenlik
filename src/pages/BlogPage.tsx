import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { dummyBlogPosts, BlogPost } from "@/data/dummyBlogPosts";
import { format } from "date-fns";
import { Search, Tag, CalendarDays, User, BookOpen, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import { EmptyState } from "@/components/EmptyState"; // EmptyState import edildi

const BlogPage = () => {
  const { userRole } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(dummyBlogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tümü");
  const [filterTag, setFilterTag] = useState("Tümü");

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    blogPosts.forEach(post => categories.add(post.category));
    return ["Tümü", ...Array.from(categories)];
  }, [blogPosts]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return ["Tümü", ...Array.from(tags)];
  }, [blogPosts]);

  const handleDeleteBlogPost = (id: string) => {
    if (window.confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")) {
      const index = dummyBlogPosts.findIndex(p => p.id === id);
      if (index !== -1) {
        dummyBlogPosts.splice(index, 1);
      }
      setBlogPosts([...dummyBlogPosts]);
      showSuccess("Blog yazısı başarıyla silindi!");
    }
  };

  const filteredPosts = useMemo(() => {
    let tempPosts = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCategory !== "Tümü") {
      tempPosts = tempPosts.filter(post => post.category === filterCategory);
    }

    if (filterTag !== "Tümü") {
      tempPosts = tempPosts.filter(post => post.tags.includes(filterTag));
    }

    return tempPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [blogPosts, searchTerm, filterCategory, filterTag]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Yazıları</h1>
          <p className="text-gray-600 dark:text-gray-400">En son güvenlik trendleri, ipuçları ve sektör haberleri.</p>
        </div>
        {userRole === 'admin' && (
          <Link to="/blog/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni Yazı Ekle
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Blog yazısı ara..."
          className="flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
        />
        <Select onValueChange={setFilterCategory} defaultValue="Tümü">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kategoriye Göre Filtrele" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setFilterTag} defaultValue="Tümü">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Etikete Göre Filtrele" />
          </SelectTrigger>
          <SelectContent>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x200?text=Görsel+Yok"; }}
                />
              )}
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link to={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center text-sm text-muted-foreground">
                  <User className="h-3 w-3 mr-1" /> {post.author}
                  <CalendarDays className="h-3 w-3 ml-4 mr-1" /> {format(post.createdAt, "dd.MM.yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-3">
                  {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                      <Tag className="inline-block h-3 w-3 mr-1" /> {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" /> Yazıyı Oku
                    </Button>
                  </Link>
                  {userRole === 'admin' && (
                    <div className="flex space-x-2">
                      <Link to={`/blog/edit/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteBlogPost(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              title="Blog Yazısı Bulunamadı"
              description="Aradığınız kriterlere uygun blog yazısı bulunamadı. Yeni bir yazı ekleyebilir veya arama/filtreleme terimlerinizi değiştirebilirsiniz."
              buttonText={userRole === 'admin' ? "Yeni Yazı Ekle" : undefined}
              onButtonClick={userRole === 'admin' ? () => window.location.href = "/blog/add" : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;