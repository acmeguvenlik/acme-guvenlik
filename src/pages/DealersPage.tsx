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
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddDealerForm, DealerFormData } from "@/components/dealers/AddDealerForm";
import { showError, showSuccess } from "@/utils/toast";

// Örnek bayi verileri
const initialDummyDealers: DealerFormData[] = [
  { id: "D001", name: "ABC Ticaret", contact: "Ali Can", phone: "5551234567", email: "abc@example.com" },
  { id: "D002", name: "XYZ Pazarlama", contact: "Ayşe Yılmaz", phone: "5559876543", email: "xyz@example.com" },
  { id: "D003", name: "Güneş Elektronik", contact: "Mehmet Demir", phone: "5551112233", email: "gunes@example.com" },
  { id: "D004", name: "Yıldız Dağıtım", contact: "Zeynep Kaya", phone: "5554445566", email: "yildiz@example.com" },
];

const DealersPage = () => {
  const [dealers, setDealers] = useState<DealerFormData[]>(initialDummyDealers);
  const [isAddDealerDialogOpen, setIsAddDealerDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<DealerFormData | undefined>(undefined);

  const handleAddDealerSuccess = (newDealerData: DealerFormData) => {
    // Yeni bir ID oluştur (şimdilik basit bir yöntem)
    const newId = `D${String(dealers.length + 1).padStart(3, '0')}`;
    setDealers((prev) => [...prev, { ...newDealerData, id: newId }]);
    setIsAddDealerDialogOpen(false);
  };

  const handleEditDealerSuccess = (updatedDealerData: DealerFormData) => {
    setDealers((prev) =>
      prev.map((dealer) =>
        dealer.id === updatedDealerData.id ? updatedDealerData : dealer
      )
    );
    setIsEditDialogOpen(false);
    setSelectedDealer(undefined);
  };

  const handleDeleteDealer = (id: string) => {
    if (window.confirm("Bu bayiyi silmek istediğinizden emin misiniz?")) {
      setDealers((prev) => prev.filter((dealer) => dealer.id !== id));
      showSuccess("Bayi başarıyla silindi!");
    }
  };

  const openEditDialog = (dealer: DealerFormData) => {
    setSelectedDealer(dealer);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bayiler Yönetimi</h1>
      <p className="text-gray-600">Sisteme kayıtlı bayilerinizi buradan yönetebilirsiniz.</p>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Bayi Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Bayi ara..."
              className="max-w-sm"
            />
            <Dialog open={isAddDealerDialogOpen} onOpenChange={setIsAddDealerDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Bayi Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Bayi Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni bir bayi eklemek için aşağıdaki formu doldurun.
                  </DialogDescription>
                </DialogHeader>
                <AddDealerForm onSuccess={handleAddDealerSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bayi Kodu</TableHead>
                <TableHead>Bayi Adı</TableHead>
                <TableHead>Yetkili Kişi</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dealers.map((dealer) => (
                <TableRow key={dealer.id}>
                  <TableCell className="font-medium">{dealer.id}</TableCell>
                  <TableCell>{dealer.name}</TableCell>
                  <TableCell>{dealer.contact}</TableCell>
                  <TableCell>{dealer.phone}</TableCell>
                  <TableCell>{dealer.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mr-2"
                      onClick={() => openEditDialog(dealer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteDealer(dealer.id!)}
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
            <DialogTitle>Bayiyi Düzenle</DialogTitle>
            <DialogDescription>
              Bayi bilgilerini güncellemek için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          {selectedDealer && (
            <AddDealerForm initialData={selectedDealer} onSuccess={handleEditDealerSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealersPage;