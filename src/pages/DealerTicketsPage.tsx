import { useState, useEffect } from "react";
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
import { PlusCircle, TicketIcon, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTicketForm } from "@/components/tickets/AddTicketForm";
import { dummyTickets, Ticket } from "@/data/dummyTickets";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

const DealerTicketsPage = () => {
  const { userRole } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isAddTicketDialogOpen, setIsAddTicketDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentDealerId = "D001";

  useEffect(() => {
    const filteredForDealer = dummyTickets.filter(ticket => ticket.dealerId === currentDealerId);
    setTickets(filteredForDealer);
  }, [currentDealerId]);

  const handleAddTicketSuccess = (newTicket: Ticket) => {
    setTickets((prev) => [...prev, newTicket]);
    setIsAddTicketDialogOpen(false);
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openTickets = filteredTickets.filter(ticket => ticket.status === "Açık").length;
  const resolvedTickets = filteredTickets.filter(ticket => ticket.status === "Çözüldü").length;
  const totalTickets = filteredTickets.length;

  return (
    <div className="space-y-6">
      <SeoHead title="Destek Taleplerim" description="Oluşturduğunuz destek taleplerini takip edin." />
      <h1 className="text-3xl font-bold">Destek Taleplerim</h1>
      <p className="text-gray-600">Oluşturduğunuz destek taleplerini buradan takip edebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Taleplerim Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Talep ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dialog open={isAddTicketDialogOpen} onOpenChange={setIsAddTicketDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Talep Oluştur
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Destek Talebi Oluştur</DialogTitle>
                  <DialogDescription>
                    Yeni bir destek talebi oluşturmak için aşağıdaki formu doldurun.
                  </DialogDescription>
                </DialogHeader>
                <AddTicketForm onSuccess={handleAddTicketSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Talep No</TableHead>
                <TableHead>Konu</TableHead>
                <TableHead>Öncelik</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Oluşturulma Tarihi</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.priority}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>{format(ticket.createdAt, "dd.MM.yyyy HH:mm")}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/tickets/${ticket.id}`}>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" /> Detaylar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerTicketsPage;