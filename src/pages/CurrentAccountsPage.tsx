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
import { PlusCircle, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddCurrentAccountForm } from "@/components/current-accounts/AddCurrentAccountForm";

// Örnek cari hesap verileri
const dummyCurrentAccounts = [
  { id: "CA001", name: "ABC Ticaret", type: "Müşteri", balance: 1500.00 },
  { id: "CA002", name: "XYZ Pazarlama", type: "Müşteri", balance: -250.50 },
  { id: "CA003", name: "Güneş Elektronik", type: "Tedarikçi", balance: 750.00 },
  { id: "CA004", name: "Yıldız Dağıtım", type: "Tedarikçi", balance: -1200.00 },
  { id: "CA005", name: "Merkez Ofis Giderleri", type: "Diğer", balance: 0.00 },
];

const CurrentAccountsPage = () => {
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddAccountSuccess = () => {
    setIsAddAccountDialogOpen(false);
    // Burada yeni eklenen cari hesabı listeye eklemek için bir state güncellemesi veya veri çekme işlemi yapılabilir.
  };

  const filteredCurrentAccounts = dummyCurrentAccounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBalance = filteredCurrentAccounts.reduce((sum, account) => sum + account.balance, 0);
  const positiveBalance = filteredCurrentAccounts.filter(acc => acc.balance >= 0).reduce((sum, acc) => sum + acc.balance, 0);
  const negativeBalance = filteredCurrentAccounts.filter(acc => acc.balance < 0).reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cari Hesaplar Yönetimi</h1>
      <p className="text-gray-600">Sisteme kayıtlı cari hesaplarınızı buradan yönetebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Cari Hesap</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredCurrentAccounts.length}</div>
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
          <CardTitle className="text-xl font-semibold">Cari Hesap Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Hesap ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dialog open={isAddAccountDialogOpen} onOpenChange={setIsAddAccountDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Hesap Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Cari Hesap Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni bir cari hesap eklemek için aşağıdaki formu doldurun.
                  </DialogDescription>
                </DialogHeader>
                <AddCurrentAccountForm onSuccess={handleAddAccountSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hesap Kodu</TableHead>
                <TableHead>Hesap Adı</TableHead>
                <TableHead>Hesap Tipi</TableHead>
                <TableHead className="text-right">Bakiye</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCurrentAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell className={`text-right ${account.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {account.balance.toFixed(2)} ₺
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentAccountsPage;