import { useState, useEffect } from "react";
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
import { TicketIcon, Clock, CheckCircle, MessageSquare, XCircle } from "lucide-react";
import { dummyTickets, Ticket } from "@/data/dummyTickets";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button"; // Button bileşeni import edildi

const AdminTicketsPage = () => {
  // dummyTickets'ın güncel bir kopyasını kullanarak state'i başlat
  const [tickets, setTickets] = useState<Ticket[]>(() => [...dummyTickets]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Tümü");

  // dummyTickets'ta dışarıdan bir değişiklik olduğunda state'i güncellemek için
  // (gerçek bir uygulamada bu bir API çağrısı veya global state yönetimi ile yapılırdı)
  useEffect(() => {
    setTickets([...dummyTickets]);
  }, [dummyTickets]); // dummyTickets referansı değişirse (örneğin yeni bir dizi atanırsa) tetiklenir

  const filteredTickets = tickets.filter(ticket =>
    (ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === "Tümü" || ticket.status === filterStatus)
  );

  const openTickets = filteredTickets.filter(ticket => ticket.status === "Açık").length;
  const resolvedTickets = filteredTickets.filter(ticket => ticket.status === "Çözüldü").length;
  const closedTickets = filteredTickets.filter(ticket => ticket.status === "Kapalı").length;
  const totalTickets = filteredTickets.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Destek Talepleri Yönetimi</h1>
      <p className="text-gray-600">Tüm destek taleplerini buradan yönetebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Talep</CardTitle>
            <TicketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Açık Talepler</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Çözülen Talepler</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kapalı Talepler</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closedTickets}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tüm Talepler Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Talep ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={setFilterStatus} defaultValue="Tümü">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Duruma Göre Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tümü">Tümü</SelectItem>
                <SelectItem value="Açık">Açık</SelectItem>
                <SelectItem value="Yanıtlandı">Yanıtlandı</SelectItem>
                <SelectItem value="Çözüldü">Çözüldü</SelectItem>
                <SelectItem value="Kapalı">Kapalı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Talep No</TableHead>
                <TableHead>Konu</TableHead>
                <TableHead>Bayi Adı</TableHead>
                <TableHead>Öncelik</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Son Güncelleme</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.dealerName}</TableCell>
                    <TableCell>{ticket.priority}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{format(ticket.updatedAt, "dd.MM.yyyy HH:mm")}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/tickets/${ticket.id}`}>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" /> Detaylar
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Gösterilecek destek talebi bulunmamaktadır.
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

export default AdminTicketsPage;