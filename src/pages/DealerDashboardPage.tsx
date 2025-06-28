import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Truck, ReceiptText } from "lucide-react"; // ReceiptText iconunu import et
import { Link } from "react-router-dom";

const DealerDashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bayi Paneli - Acme Güvenlik</h1>
      <p className="text-gray-600">Bayi sistemine hoş geldiniz. Buradan siparişlerinizi ve stok durumunuzu takip edebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Siparişler</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Yeni siparişleriniz var</p>
            <Link to="/dealer-orders" className="text-sm text-blue-600 hover:underline">Tüm siparişleri gör</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stoktaki Ürünler</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Toplam farklı ürün çeşidi</p>
            <Link to="/dealer-stock" className="text-sm text-blue-600 hover:underline">Ürün kataloğunu gör</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Faturalar</CardTitle>
            <ReceiptText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Ödenmemiş faturalarınız var</p>
            <Link to="/dealer-invoices" className="text-sm text-blue-600 hover:underline">Tüm faturaları gör</Link> {/* Yeni link */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DealerDashboardPage;