import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart, CheckCircle, Clock, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UpdateOrderStatusForm } from "@/components/orders/UpdateOrderStatusForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SeoHead } from "@/components/seo/SeoHead";

// Örnek tüm sipariş verileri (admin görünümü için)
interface Order {
  id: string;
  orderNumber: string;
  dealerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  status: "Beklemede" | "Kargoda" | "Tamamlandı" | "İptal Edildi";
}

const initialDummyAllOrders: Order[] = [
  { id: "ORD-001", orderNumber: "ORD-2024-001", dealerName: "ABC Ticaret", productName: "Güvenlik Kamerası", quantity: 2, totalPrice: 1799.98, orderDate: new Date("2024-07-20"), status: "Beklemede" },
  { id: "ORD-002", orderNumber: "ORD-2024-002", dealerName: "XYZ Pazarlama", productName: "DVR Kayıt Cihazı", quantity: 1, totalPrice: 1499.99, orderDate: new Date("2024-07-18"), status: "Tamamlandı" },
  { id: "ORD-003", orderNumber: "ORD-2024-003", dealerName: "Güneş Elektronik", productName: "Hareket Sensörü", quantity: 5, totalPrice: 1249.95, orderDate: new Date("2024-07-15"), status: "Kargoda" },
  { id: "ORD-004", orderNumber: "ORD-2024-004", dealerName: "Yıldız Dağıtım", productName: "Alarm Paneli", quantity: 1, totalPrice: 1999.99, orderDate: new Date("2024-07-10"), status: "Beklemede" },
];

const OrdersPage = () => {
  const [allOrders, setAllOrders] = useState<Order[]>(initialDummyAllOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);

  const handleUpdateStatusSuccess = (orderId: string, newStatus: string) => {
    setAllOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus as Order["status"] } : order
      )
    );
    setIsUpdateStatusDialogOpen(false);
    setSelectedOrder(undefined);
  };

  const openUpdateStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsUpdateStatusDialogOpen(true);
  };

  const filteredOrders = allOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOrders = filteredOrders.length;
  const pendingOrders = filteredOrders.filter(order => order.status === "Beklemede").length;
  const completedOrders = filteredOrders.filter(order => order.status === "Tamamlandı").length;

  return (
    <div className="space-y-6">
      <SeoHead title="Sipariş Yönetimi" description="Tüm bayi siparişlerini görüntüleyin ve yönetin." />
      <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>
      <p className="text-gray-600">Tüm bayi siparişlerini buradan yönetebilirsiniz.</p>

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
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan Siparişler</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle>Tüm Siparişler Listesi</CardTitle>
          <div className="flex space-x-2 w-full sm:w-auto">
            <Input
              placeholder="Sipariş ara..."
              className="max-w-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto"> {/* Tabloyu duyarlı hale getir */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sipariş No</TableHead>
                  <TableHead>Bayi Adı</TableHead>
                  <TableHead>Ürün Adı</TableHead>
                  <TableHead className="text-right">Miktar</TableHead>
                  <TableHead className="text-right">Toplam Tutar</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.dealerName}</TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell className="text-right">{order.quantity}</TableCell>
                    <TableCell className="text-right">{order.totalPrice.toFixed(2)} ₺</TableCell>
                    <TableCell>{format(order.orderDate, "dd.MM.yyyy")}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menüyü aç</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DialogTrigger asChild>
                            <DropdownMenuItem onClick={() => openUpdateStatusDialog(order)}>
                              Durumu Güncelle
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sipariş Durumunu Güncelle</DialogTitle>
            <DialogDescription>
              Sipariş #{selectedOrder?.orderNumber} için durumu güncelleyin.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <UpdateOrderStatusForm
              orderId={selectedOrder.id}
              currentStatus={selectedOrder.status}
              onSuccess={handleUpdateStatusSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;