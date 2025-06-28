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
import { PlusCircle, ShoppingCart, Package, Truck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddOrderForm } from "@/components/orders/AddOrderForm";
import { format } from "date-fns";

// Örnek bayi sipariş verileri
interface Order {
  id: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  status: "Beklemede" | "Kargoda" | "Tamamlandı" | "İptal Edildi";
  dealerId?: string; // Cari entegrasyon için eklendi
  dealerName?: string; // Cari entegrasyon için eklendi
}

const initialDummyDealerOrders: Order[] = [
  { id: "ORD-001", orderNumber: "ORD-2024-001", productName: "Güvenlik Kamerası", quantity: 2, totalPrice: 1799.98, orderDate: new Date("2024-07-20"), status: "Beklemede", dealerId: "D001", dealerName: "ABC Ticaret" },
  { id: "ORD-002", orderNumber: "ORD-2024-002", productName: "DVR Kayıt Cihazı", quantity: 1, totalPrice: 1499.99, orderDate: new Date("2024-07-18"), status: "Tamamlandı", dealerId: "D001", dealerName: "ABC Ticaret" },
  { id: "ORD-003", orderNumber: "ORD-2024-003", productName: "Hareket Sensörü", quantity: 5, totalPrice: 1249.95, orderDate: new Date("2024-07-15"), status: "Kargoda", dealerId: "D001", dealerName: "ABC Ticaret" },
];

const DealerOrdersPage = () => {
  const [dealerOrders, setDealerOrders] = useState<Order[]>(initialDummyDealerOrders);
  const [isAddOrderDialogOpen, setIsAddOrderDialogOpen] = useState(false);

  const handleAddOrderSuccess = (newOrder: Order) => {
    setDealerOrders((prev) => [...prev, newOrder]); // Yeni siparişi listeye ekle
    setIsAddOrderDialogOpen(false);
  };

  const totalOrders = dealerOrders.length;
  const pendingOrders = dealerOrders.filter(order => order.status === "Beklemede").length;
  const completedOrders = dealerOrders.filter(order => order.status === "Tamamlandı").length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Siparişlerim</h1>
      <p className="text-gray-600">Geçmiş ve mevcut siparişlerinizi buradan takip edebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Siparişler</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan Siparişler</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Sipariş Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Sipariş ara..."
              className="max-w-sm"
            />
            <Dialog open={isAddOrderDialogOpen} onOpenChange={setIsAddOrderDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Sipariş Oluştur
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Sipariş Oluştur</DialogTitle>
                  <DialogDescription>
                    Yeni bir sipariş oluşturmak için aşağıdaki formu doldurun.
                  </DialogDescription>
                </DialogHeader>
                <AddOrderForm onSuccess={handleAddOrderSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sipariş No</TableHead>
                <TableHead>Ürün Adı</TableHead>
                <TableHead className="text-right">Miktar</TableHead>
                <TableHead className="text-right">Toplam Tutar</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dealerOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell className="text-right">{order.quantity}</TableCell>
                  <TableCell className="text-right">{order.totalPrice.toFixed(2)} ₺</TableCell>
                  <TableCell>{format(order.orderDate, "dd.MM.yyyy")}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerOrdersPage;