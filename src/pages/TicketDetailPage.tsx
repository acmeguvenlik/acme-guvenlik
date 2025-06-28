import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, User, Settings } from "lucide-react";
import { dummyTickets, Ticket, TicketMessage } from "@/data/dummyTickets";
import { format } from "date-fns";
import { TicketMessageForm } from "@/components/tickets/TicketMessageForm";
import { useAuth } from "@/context/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);

  useEffect(() => {
    const foundTicket = dummyTickets.find(t => t.id === id);
    if (foundTicket) {
      setTicket(foundTicket);
    } else {
      navigate("/not-found"); // Talep bulunamazsa 404 sayfasına yönlendir
    }
  }, [id, navigate]);

  const handleSendMessage = (content: string) => {
    if (!ticket) return;

    const newMessage: TicketMessage = {
      id: `MSG-${Date.now()}`,
      senderId: userRole === 'admin' ? "U001" : "D001", // Örnek ID'ler
      senderRole: userRole === 'admin' ? "admin" : "dealer",
      content,
      createdAt: new Date(),
    };

    const updatedTicket = {
      ...ticket,
      messages: [...ticket.messages, newMessage],
      updatedAt: new Date(),
      status: ticket.status === 'Çözüldü' || ticket.status === 'Kapalı' ? 'Açık' : 'Yanıtlandı', // Mesaj gelince durumu güncelle
    };

    // Dummy veriyi güncelle (gerçek uygulamada backend API çağrısı olur)
    const ticketIndex = dummyTickets.findIndex(t => t.id === ticket.id);
    if (ticketIndex !== -1) {
      dummyTickets[ticketIndex] = updatedTicket;
    }
    setTicket(updatedTicket);
  };

  const handleStatusChange = (newStatus: Ticket['status']) => {
    if (!ticket) return;

    const updatedTicket = {
      ...ticket,
      status: newStatus,
      updatedAt: new Date(),
    };

    const ticketIndex = dummyTickets.findIndex(t => t.id === ticket.id);
    if (ticketIndex !== -1) {
      dummyTickets[ticketIndex] = updatedTicket;
    }
    setTicket(updatedTicket);
    showSuccess(`Talep durumu "${newStatus}" olarak güncellendi.`);
  };

  if (!ticket) {
    return null; // Yönlendirme yapıldığı için burada null dönebiliriz
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Talep Detayı: {ticket.subject}</h1>
        <Link to={userRole === 'admin' ? "/admin-tickets" : "/dealer-tickets"}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Talepler Listesine Dön
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Talep ID: {ticket.id}</p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{ticket.subject}</span>
            {userRole === 'admin' && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Durum:</span>
                <Select onValueChange={handleStatusChange} defaultValue={ticket.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Durum Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Açık">Açık</SelectItem>
                    <SelectItem value="Yanıtlandı">Yanıtlandı</SelectItem>
                    <SelectItem value="Çözüldü">Çözüldü</SelectItem>
                    <SelectItem value="Kapalı">Kapalı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardTitle>
          <CardDescription>
            Oluşturan: {ticket.dealerName} | Öncelik: {ticket.priority} | Durum: {ticket.status}
            <br />
            Oluşturulma: {format(ticket.createdAt, "dd.MM.yyyy HH:mm")} | Son Güncelleme: {format(ticket.updatedAt, "dd.MM.yyyy HH:mm")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{ticket.description}</p>

          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" /> Mesajlar
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {ticket.messages.length > 0 ? (
              ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderRole === userRole ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-3 rounded-lg ${
                    message.senderRole === userRole
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    <div className="font-semibold text-sm mb-1">
                      {message.senderRole === 'admin' ? 'Admin' : ticket.dealerName}
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <div className="text-xs text-right mt-1 opacity-80">
                      {format(message.createdAt, "dd.MM.yyyy HH:mm")}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">Bu talep için henüz mesaj bulunmamaktadır.</p>
            )}
          </div>

          <div className="mt-6 border-t pt-4">
            <TicketMessageForm onSendMessage={handleSendMessage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetailPage;