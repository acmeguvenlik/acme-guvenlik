import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "@/components/reports/SalesChart";
import { LineChart, DollarSign, TrendingUp } from "lucide-react";

const ReportsPage = () => {
  // Örnek rapor özet verileri
  const totalSalesValue = 45231.89;
  const totalOrders = 150;
  const averageOrderValue = totalSalesValue / totalOrders;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Raporlar ve Analizler</h1>
      <p className="text-gray-600">İşletmenizin performansını gösteren raporları buradan inceleyebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Satış Değeri</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalSalesValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+15% geçen aydan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Sipariş Değeri</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+2% geçen aydan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş Adedi</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+10% geçen aydan</p>
          </CardContent>
        </Card>
      </div>

      <SalesChart />
    </div>
  );
};

export default ReportsPage;