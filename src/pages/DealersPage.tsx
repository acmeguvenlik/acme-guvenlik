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
import { PlusCircle, Edit, Trash2, Wallet, TrendingUp, TrendingDown, ListChecks, Download } from "lucide-react"; // ListChecks ve Download import edildi
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddDealerForm, DealerFormData } from "@/components/dealers/AddDealerForm";
import { showError, showSuccess } from "@/utils/toast";
import { Link } from "react-router-dom";
import { dummyDealers as initialDummyDealers } from "@/data/dummyDealers";
import { exportToCsv } from "@/utils/export"; // exportToCsv import edildi

const DealersPage = () => {
  const [dealers, setDealers] = useState<DealerFormData[]>(initialDummyDealers);
  const [isAddDealerDialogOpen, setIsAddDealerDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<DealerFormData | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredDealers = dealers.filter(dealer =>
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBalance = filteredDealers.reduce((sum, account) => sum + account.balance, 0);
  const positiveBalance = filteredDealers.filter(acc => acc.balance >= 0).reduce((sum, acc) => sum + acc.balance, 0);
  const negativeBalance = filteredDealers.filter(acc => acc.balance < 0).reduce((sum, acc) => sum + acc.balance, 0);

  const handleExportCsv = () => {
    const columns = [
      { header: "Bayi Kodu", key: "id" },
      { header: "Bayi Adı", key: "name" },
      { header: "Yetkili Kişi", key: "contact" },
      { header: "Telefon", key: "phone" },
      { header: "E-posta", key: "email" },
      { header: "Hesap Tipi", key: "accountType" },
      { header: "Bakiye", key: "balance" },
    ];
    exportToCsv(filteredDealers, "bayi_listesi", columns);
    showSuccess("Bayi listesi CSV olarak dışa aktarıldı!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bayiler ve Cari Hesaplar Yönetimi</h1>
      <p className="text-gray-600">Sisteme kayıtlı bayilerinizi ve cari hesaplarını buradan yönetebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Bayi/Hesap</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredDealers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Alacak</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₺{positiveBalance.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Borç</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₺{Math.abs(negativeBalance).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Bayi/Cari Hesap Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Bayi/Hesap ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" onClick={handleExportCsv}>
              <Download className="mr-2 h-4 w-4" />
              Dışa Aktar (CSV)
            </Button>
            <Dialog open={isAddDealerDialogOpen} onOpenChange={setIsAddDealerDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Bayi/Hesap Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Bayi/Cari Hesap Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni bir bayi veya cari hesap eklemek için aşağıdaki formu doldurun.
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
                <TableHead>Hesap Tipi</TableHead>
                <TableHead className="text-right">Bakiye</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDealers.map((dealer) => (
                <TableRow key={dealer.id}>
                  <TableCell className="font-medium">{dealer.id}</TableCell>
                  <TableCell>{dealer.name}</TableCell>
                  <TableCell>{dealer.contact}</TableCell>
                  <TableCell>{dealer.phone}</TableCell>
                  <TableCell>{dealer.email}</TableCell>
                  <TableCell>{dealer.accountType}</TableCell>
                  <TableCell className={`text-right ${dealer.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {dealer.balance.toFixed(2)} ₺
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/dealers/${dealer.id}/transactions`}>
                      <Button variant="outline" size="sm" className="mr-2">
                        <ListChecks className="h-4 w-4" />
                      </Button>
                    </Link>
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
            <DialogTitle>Bayiyi Düzenle</CardTitle>
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