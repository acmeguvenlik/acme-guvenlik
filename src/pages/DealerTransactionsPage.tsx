import { useState, useEffect, useMemo } from "react";
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
import { ArrowLeft, PlusCircle, DollarSign, Edit, Trash2, ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import { dummyTransactions, Transaction } from "@/data/dummyTransactions";
import { dummyDealers } from "@/data/dummyDealers";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTransactionForm } from "@/components/dealers/AddTransactionForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { SeoHead } from "@/components/seo/SeoHead";

const DealerTransactionsPage = () => {
  const { dealerId } = useParams<{ dealerId: string }>();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dealerName, setDealerName] = useState<string>("");
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false);
  const [isEditTransactionDialogOpen, setIsEditTransactionDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("Tümü");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const foundDealer = dummyDealers.find(d => d.id === dealerId);
    if (!foundDealer) {
      navigate("/not-found");
      return;
    }
    setDealerName(foundDealer.name);
    setCurrentBalance(foundDealer.balance);

    const filteredTransactions = dummyTransactions.filter(t => t.dealerId === dealerId);
    setTransactions(filteredTransactions);
  }, [dealerId, navigate]);

  const filteredAndSortedTransactions = useMemo(() => {
    let tempTransactions = transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterType !== "Tümü") {
      tempTransactions = tempTransactions.filter(transaction => transaction.type === filterType);
    }

    tempTransactions.sort((a, b) => {
      const dateA = a.date.getTime();
      const dateB = b.date.getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return tempTransactions;
  }, [transactions, searchTerm, filterType, sortOrder]);

  const updateDealerBalance = (transaction: Transaction, isAddition: boolean) => {
    const dealerIndex = dummyDealers.findIndex(d => d.id === transaction.dealerId);
    if (dealerIndex !== -1) {
      if (isAddition) {
        dummyDealers[dealerIndex].balance += transaction.amount;
      } else {
        dummyDealers[dealerIndex].balance -= transaction.amount;
      }
      setCurrentBalance(dummyDealers[dealerIndex].balance);
    }
  };

  const handleAddTransactionSuccess = (newTransaction: Transaction) => {
    dummyTransactions.push(newTransaction);
    setTransactions((prev) => [...prev, newTransaction]);
    updateDealerBalance(newTransaction, true);
    setIsAddTransactionDialogOpen(false);
  };

  const handleEditTransactionSuccess = (updatedTransaction: Transaction) => {
    const oldTransaction = dummyTransactions.find(t => t.id === updatedTransaction.id);
    if (oldTransaction) {
      updateDealerBalance(oldTransaction, false);
      updateDealerBalance(updatedTransaction, true);

      const globalIndex = dummyTransactions.findIndex(t => t.id === updatedTransaction.id);
      if (globalIndex !== -1) {
        dummyTransactions[globalIndex] = updatedTransaction;
      }
    }
    
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
    setIsEditTransactionDialogOpen(false);
    setSelectedTransaction(undefined);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm("Bu işlemi silmek istediğinizden emin misiniz?")) {
      const transactionToDelete = dummyTransactions.find(t => t.id === id);
      if (transactionToDelete) {
        updateDealerBalance(transactionToDelete, false);
        
        const globalIndex = dummyTransactions.findIndex(t => t.id === id);
        if (globalIndex !== -1) {
          dummyTransactions.splice(globalIndex, 1);
        }
        setTransactions((prev) => prev.filter((t) => t.id !== id));
        showSuccess("İşlem başarıyla silindi!");
      }
    }
  };

  const openEditDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditTransactionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <SeoHead title={`${dealerName} Cari Hesap Hareketleri`} description={`${dealerName} bayisinin tüm finansal hareketlerini inceleyin.`} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-3xl font-bold">{dealerName} Cari Hesap Hareketleri</h1>
        <Link to="/dealers">
          <Button variant="outline" className="w-full sm:w-auto">
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
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle>İşlem Listesi</CardTitle>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <Input
              placeholder="İşlem ara..."
              className="max-w-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={setFilterType} defaultValue="Tümü">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipe Göre Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tümü">Tümü</SelectItem>
                <SelectItem value="Ödeme">Ödeme</SelectItem>
                <SelectItem value="Borç">Borç</SelectItem>
                <SelectItem value="Fatura">Fatura</SelectItem>
                <SelectItem value="İade">İade</SelectItem>
                <SelectItem value="Diğer">Diğer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="w-full sm:w-auto">
              {sortOrder === 'asc' ? <ArrowUpWideNarrow className="h-4 w-4" /> : <ArrowDownWideNarrow className="h-4 w-4" />}
              <span className="ml-2 hidden sm:inline">Tarih</span>
            </Button>
            <Dialog open={isAddTransactionDialogOpen} onOpenChange={setIsAddTransactionDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
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
          <div className="overflow-x-auto"> {/* Tabloyu duyarlı hale getir */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>İşlem ID</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>Açıklama</TableHead>
                  <TableHead className="text-right">Tutar</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTransactions.length > 0 ? (
                  filteredAndSortedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{format(transaction.date, "dd.MM.yyyy HH:mm")}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {transaction.amount.toFixed(2)} ₺
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mr-2"
                          onClick={() => openEditDialog(transaction)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTransaction(transaction.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Bu bayi için henüz bir işlem bulunmamaktadır.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Düzenleme Diyaloğu */}
      <Dialog open={isEditTransactionDialogOpen} onOpenChange={setIsEditTransactionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>İşlemi Düzenle</DialogTitle>
            <DialogDescription>
              İşlem bilgilerini güncellemek için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <AddTransactionForm
              dealerId={dealerId!}
              initialData={selectedTransaction}
              onSuccess={handleEditTransactionSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealerTransactionsPage;