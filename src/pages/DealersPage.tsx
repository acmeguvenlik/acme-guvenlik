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
import { PlusCircle } from "lucide-react";

// Örnek bayi verileri
const dummyDealers = [
  { id: "D001", name: "ABC Ticaret", contact: "Ali Can", phone: "555-123-4567", email: "abc@example.com" },
  { id: "D002", name: "XYZ Pazarlama", contact: "Ayşe Yılmaz", phone: "555-987-6543", email: "xyz@example.com" },
  { id: "D003", name: "Güneş Elektronik", contact: "Mehmet Demir", phone: "555-111-2233", email: "gunes@example.com" },
  { id: "D004", name: "Yıldız Dağıtım", contact: "Zeynep Kaya", phone: "555-444-5566", email: "yildiz@example.com" },
];

const DealersPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bayiler Yönetimi</h1>
      <p className="text-gray-600">Sisteme kayıtlı bayilerinizi buradan yönetebilirsiniz.</p>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Bayi Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Bayi ara..."
              className="max-w-sm"
            />
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni Bayi Ekle
            </Button>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyDealers.map((dealer) => (
                <TableRow key={dealer.id}>
                  <TableCell className="font-medium">{dealer.id}</TableCell>
                  <TableCell>{dealer.name}</TableCell>
                  <TableCell>{dealer.contact}</TableCell>
                  <TableCell>{dealer.phone}</TableCell>
                  <TableCell>{dealer.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealersPage;