import { useState } from "react";
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
import { PlusCircle, Edit, Trash2, Megaphone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddAnnouncementForm } from "@/components/announcements/AddAnnouncementForm";
import { dummyAnnouncements, Announcement } from "@/data/dummyAnnouncements";
import { showSuccess } from "@/utils/toast";
import { format } from "date-fns";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(dummyAnnouncements);
  const [isAddAnnouncementDialogOpen, setIsAddAnnouncementDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddAnnouncementSuccess = (newAnnouncement: Announcement) => {
    setAnnouncements((prev) => [...prev, newAnnouncement]);
    setIsAddAnnouncementDialogOpen(false);
  };

  const handleEditAnnouncementSuccess = (updatedAnnouncement: Announcement) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === updatedAnnouncement.id ? updatedAnnouncement : ann
      )
    );
    setIsEditDialogOpen(false);
    setSelectedAnnouncement(undefined);
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (window.confirm("Bu duyuruyu silmek istediğinizden emin misiniz?")) {
      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
      showSuccess("Duyuru başarıyla silindi!");
    }
  };

  const openEditDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditDialogOpen(true);
  };

  const filteredAnnouncements = announcements.filter(ann =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.targetRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Duyurular Yönetimi</h1>
      <p className="text-gray-600">Sistemdeki duyuruları buradan yönetebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Duyuru</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Duyuru Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Duyuru ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dialog open={isAddAnnouncementDialogOpen} onOpenChange={setIsAddAnnouncementDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Duyuru Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Duyuru Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni bir duyuru eklemek için aşağıdaki formu doldurun.
                  </DialogDescription>
                </DialogHeader>
                <AddAnnouncementForm onSuccess={handleAddAnnouncementSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Hedef Kitle</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((ann) => (
                <TableRow key={ann.id}>
                  <TableCell className="font-medium">{ann.title}</TableCell>
                  <TableCell>{ann.targetRole === 'all' ? 'Tüm Kullanıcılar' : ann.targetRole === 'admin' ? 'Yöneticiler' : 'Bayiler'}</TableCell>
                  <TableCell>{format(ann.createdAt, "dd.MM.yyyy HH:mm")}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mr-2"
                      onClick={() => openEditDialog(ann)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Düzenleme Diyaloğu */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Duyuruyu Düzenle</DialogTitle>
            <DialogDescription>
              Duyuru bilgilerini güncellemek için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          {selectedAnnouncement && (
            <AddAnnouncementForm initialData={selectedAnnouncement} onSuccess={handleEditAnnouncementSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementsPage;