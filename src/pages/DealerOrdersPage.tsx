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
import { SeoHead } from "@/components/seo/SeoHead";

// Örnek bayi sipariş verileri
const dummyDealerOrders = [
  { id: "ORD-001", orderNumber: "ORD-2024-001", productName: "Güvenlik Kamerası", quantity: 2, totalPrice: 1799.98, orderDate: new Date("2024-07-20"), status: "Beklemede" },
  { id: "ORD-002", orderNumber: "ORD-2024-002", productName: "DVR Kayıt Cihazı", quantity: 1, totalPrice: 1499.99, orderDate: new Date("2024-07-18"), status: "Tamamlandı" },
  { id: "ORD-003", orderNumber: "ORD-2024-003", productName: "Hareket Sensörü", quantity: 5, totalPrice: 1249.95, orderDate: new Date("2024-07-15"), status: "Kargoda" },
];

const DealerOrdersPage = () => {
  const [isAddOrderDialogOpen, setIsAddOrderDialogOpen] = useState(false);

  const handleAddOrderSuccess = () => {
    setIsAddOrderDialogOpen(false);
  };

  const totalOrders = dummyDealerOrders.length;
  const pendingOrders = dummyDealerOrders.filter(order => order.status === "Beklemede").length;
  const completedOrders = dummyDealerOrders.filter(order => order.status === "Tamamlandı").length;

  return (
    <div className="space-y-6">
      <SeoHead title="Siparişlerim" description="Geçmiş ve mevcut siparişlerinizi takip edin." />
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
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Sipariş Listesi</CardTitle>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <Input
              placeholder="Sipariş ara..."
              className="max-w-sm w-full"
            />
            <Dialog open={isAddOrderDialogOpen} onOpenChange={setIsAddOrderDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
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
          <div className="overflow-x-auto"> {/* Tabloyu duyarlı hale getir */}
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
                {dummyDealerOrders.map((order) => (
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerOrdersPage;