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
import { ShoppingCart, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

// Örnek tüm sipariş verileri (admin görünümü için)
const dummyAllOrders = [
  { id: "ORD-001", orderNumber: "ORD-2024-001", dealerName: "ABC Ticaret", productName: "Güvenlik Kamerası", quantity: 2, totalPrice: 1799.98, orderDate: new Date("2024-07-20"), status: "Beklemede" },
  { id: "ORD-002", orderNumber: "ORD-2024-002", dealerName: "XYZ Pazarlama", productName: "DVR Kayıt Cihazı", quantity: 1, totalPrice: 1499.99, orderDate: new Date("2024-07-18"), status: "Tamamlandı" },
  { id: "ORD-003", orderNumber: "ORD-2024-003", dealerName: "Güneş Elektronik", productName: "Hareket Sensörü", quantity: 5, totalPrice: 1249.95, orderDate: new Date("2024-07-15"), status: "Kargoda" },
  { id: "ORD-004", orderNumber: "ORD-2024-004", dealerName: "Yıldız Dağıtım", productName: "Alarm Paneli", quantity: 1, totalPrice: 1999.99, orderDate: new Date("2024-07-10"), status: "Beklemede" },
];

const OrdersPage = () => {
  const totalOrders = dummyAllOrders.length;
  const pendingOrders = dummyAllOrders.filter(order => order.status === "Beklemede").length;
  const completedOrders = dummyAllOrders.filter(order => order.status === "Tamamlandı").length;

  return (
    <div className="space-y-6">
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tüm Siparişler Listesi</CardTitle>
          <div className="flex space-x-2">
            <Input placeholder="Sipariş ara..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyAllOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.dealerName}</TableCell>
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

export default OrdersPage;