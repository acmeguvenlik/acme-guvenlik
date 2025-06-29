import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, FileText, FolderDot } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddEditPageForm } from "@/components/pages/AddEditPageForm";
import { dummyDynamicPages, DynamicPage } from "@/data/dummyPages";
import { showSuccess } from "@/utils/toast";
import { format } from "date-fns";
import { SeoHead } from "@/components/seo/SeoHead";
import { EmptyState } from "@/components/EmptyState";
import { Link } from "react-router-dom";

const AdminPagesPage = () => {
  const [pages, setPages] = useState<DynamicPage[]>(dummyDynamicPages);
  const [isAddPageDialogOpen, setIsAddPageDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<DynamicPage | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddPageSuccess = (newPage: DynamicPage) => {
    dummyDynamicPages.push(newPage); // Dummy veriye ekle
    setPages([...dummyDynamicPages]); // State'i güncelle
    setIsAddPageDialogOpen(false);
  };

  const handleEditPageSuccess = (updatedPage: DynamicPage) => {
    const index = dummyDynamicPages.findIndex(p => p.id === updatedPage.id);
    if (index !== -1) {
      dummyDynamicPages[index] = updatedPage;
    }
    setPages([...dummyDynamicPages]);
    setIsEditDialogOpen(false);
    setSelectedPage(undefined);
  };

  const handleDeletePage = (id: string) => {
    if (window.confirm("Bu sayfayı silmek istediğinizden emin misiniz?")) {
      const index = dummyDynamicPages.findIndex(p => p.id === id);
      if (index !== -1) {
        dummyDynamicPages.splice(index, 1);
      }
      setPages([...dummyDynamicPages]);
      showSuccess("Sayfa başarıyla silindi!");
    }
  };

  const openEditDialog = (page: DynamicPage) => {
    setSelectedPage(page);
    setIsEditDialogOpen(true);
  };

  const filteredPages = useMemo(() => {
    return pages.filter(page =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.content.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
      // Ana sayfaları üste, sonra alt sayfaları sırala
      if (a.parentId === null && b.parentId !== null) return -1;
      if (a.parentId !== null && b.parentId === null) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [pages, searchTerm]);

  const getParentTitle = (parentId: string | null) => {
    if (!parentId) return "Ana Sayfa";
    const parent = dummyDynamicPages.find(p => p.id === parentId);
    return parent ? parent.title : "Bilinmiyor";
  };

  return (
    <div className="space-y-6">
      <SeoHead title="Dinamik Sayfa Yönetimi" description="Uygulamanızdaki dinamik içerik sayfalarını yönetin." />
      <h1 className="text-3xl font-bold">Dinamik Sayfa Yönetimi</h1>
      <p className="text-gray-600">Uygulamanızdaki dinamik içerik sayfalarını buradan yönetebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sayfa</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ana Sayfalar</CardTitle>
            <FolderDot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.filter(p => p.parentId === null).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alt Sayfalar</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.filter(p => p.parentId !== null).length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Sayfa Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Sayfa ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dialog open={isAddPageDialogOpen} onOpenChange={setIsAddPageDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Sayfa Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Yeni Dinamik Sayfa Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni bir içerik sayfası oluşturmak için aşağıdaki formu doldurun.
                  </DialogDescription>
                </DialogHeader>
                <AddEditPageForm onSuccess={handleAddPageSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>URL Slug</TableHead>
                  <TableHead>Üst Sayfa</TableHead>
                  <TableHead>Hedef Kitle</TableHead>
                  <TableHead>Son Güncelleme</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">
                      <Link to={`/pages/${page.slug}`} className="text-blue-600 hover:underline">
                        {page.title}
                      </Link>
                    </TableCell>
                    <TableCell>/pages/{page.slug}</TableCell>
                    <TableCell>{getParentTitle(page.parentId)}</TableCell>
                    <TableCell>{page.targetRole === 'all' ? 'Tüm Kullanıcılar' : page.targetRole === 'admin' ? 'Yöneticiler' : 'Bayiler'}</TableCell>
                    <TableCell>{format(page.updatedAt, "dd.MM.yyyy HH:mm")}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        onClick={() => openEditDialog(page)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePage(page.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              title="Sayfa Bulunamadı"
              description="Aradığınız kriterlere uygun dinamik sayfa bulunamadı. Yeni bir sayfa ekleyebilir veya arama teriminizi değiştirebilirsiniz."
              buttonText="Yeni Sayfa Ekle"
              onButtonClick={() => setIsAddPageDialogOpen(true)}
            />
          )}
        </CardContent>
      </Card>

      {/* Düzenleme Diyaloğu */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Dinamik Sayfayı Düzenle</DialogTitle>
            <DialogDescription>
              Sayfa bilgilerini güncellemek için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          {selectedPage && (
            <AddEditPageForm initialData={selectedPage} onSuccess={handleEditPageSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPagesPage;