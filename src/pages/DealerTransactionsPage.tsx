import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ArrowLeft, PlusCircle, DollarSign } from "lucide-react";
import { dummyTransactions, Transaction } from "@/data/dummyTransactions";
import { dummyDealers } from "@/data/dummyDealers"; // dummyDealers yeni konumundan import edildi
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTransactionForm } from "@/components/dealers/AddTransactionForm";

const DealerTransactionsPage = () => {
  const { dealerId } = useParams<{ dealerId: string }>();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dealerName, setDealerName] = useState<string>("");
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const foundDealer = dummyDealers.find(d => d.id === dealerId);
    if (!foundDealer) {
      navigate("/not-found");
      return;
    }
    setDealerName(foundDealer.name);
    setCurrentBalance(foundDealer.balance);

    const filteredTransactions = dummyTransactions.filter(t => t.dealerId === dealerId);
    setTransactions(filteredTransactions.sort((a, b) => b.date.getTime() - a.date.getTime())); // En yeni en üstte
  }, [dealerId, navigate]);

  const handleAddTransactionSuccess = (newTransaction: Transaction) => {
    // dummyTransactions'a yeni işlemi ekle
    dummyTransactions.push(newTransaction);
    // State'i güncelleyerek listeyi ve bakiyeyi yenile
    const updatedTransactions = dummyTransactions.filter(t => t.dealerId === dealerId);
    setTransactions(updatedTransactions.sort((a, b) => b.date.getTime() - a.date.getTime()));

    // Bayinin güncel bakiyesini al
    const updatedDealer = dummyDealers.find(d => d.id === dealerId);
    if (updatedDealer) {
      setCurrentBalance(updatedDealer.balance);
    }
    setIsAddTransactionDialogOpen(false);
  };

  const filteredTransactionsBySearch = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{dealerName} Cari Hesap Hareketleri</h1>
        <Link to="/dealers">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Bayi Listesine Dön
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Bayinin tüm finansal hareketlerini buradan inceleyebilirsiniz.</p>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Güncel Bakiye</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${currentBalance < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ₺{currentBalance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Bayinin anlık cari hesap bakiyesi</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>İşlem Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="İşlem ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dialog open={isAddTransactionDialogOpen} onOpenChange={setIsAddTransactionDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni İşlem Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Cari Hesap İşlemi Ekle</DialogTitle>
                  <DialogDescription>
                    {dealerName} için yeni bir finansal işlem ekleyin.
                  </DialogDescription>
                </DialogHeader>
                <AddTransactionForm dealerId={dealerId!} onSuccess={handleAddTransactionSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşlem ID</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead className="text-right">Tutar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactionsBySearch.length > 0 ? (
                filteredTransactionsBySearch.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{format(transaction.date, "dd.MM.yyyy HH:mm")}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.amount.toFixed(2)} ₺
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Bu bayi için henüz bir işlem bulunmamaktadır.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerTransactionsPage;