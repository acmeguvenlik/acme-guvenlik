import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare } from 'lucide-react';
import { dummyConversations, Conversation, Message } from '@/data/dummyMessages';
import { useAuth } from '@/context/AuthContext';
import { ConversationList } from '@/components/messages/ConversationList';
import { MessageDisplay } from '@/components/messages/MessageDisplay';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddConversationForm } from '@/components/messages/AddConversationForm';
import { showSuccess } from '@/utils/toast';
import { dummyUsers } from '@/data/dummyUsers'; // Kullanıcı listesi için doğru konumdan import edildi

const MessagesPage = () => {
  const { userRole } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);

  // Mevcut kullanıcı ID'sini belirle (şimdilik sabit, gerçekte AuthContext'ten gelir)
  const currentUserId = userRole === 'admin' ? "U001" : "D001"; // Örnek ID'ler
  const currentUserName = userRole === 'admin' ? "Admin User" : "ABC Ticaret"; // Örnek isimler

  useEffect(() => {
    // Kullanıcının dahil olduğu konuşmaları filtrele
    const userConversations = dummyConversations.filter(conv =>
      conv.participants.some(p => p.id === currentUserId)
    ).sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()); // En son mesajlaşma tarihine göre sırala
    setConversations(userConversations);

    // Eğer seçili bir konuşma yoksa ve konuşmalar varsa ilkini seç
    if (!selectedConversationId && userConversations.length > 0) {
      setSelectedConversationId(userConversations[0].id);
    }
  }, [currentUserId, selectedConversationId]);

  const filteredConversations = useMemo(() => {
    return conversations.filter(conv =>
      conv.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      conv.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [conversations, searchTerm]);

  const selectedConversation = useMemo(() => {
    return conversations.find(conv => conv.id === selectedConversationId);
  }, [conversations, selectedConversationId]);

  const handleSendMessage = (conversationId: string, content: string) => {
    setConversations(prevConversations => {
      const updatedConversations = prevConversations.map(conv => {
        if (conv.id === conversationId) {
          const newMessage: Message = {
            id: `MSG-C${conv.id.split('-')[1]}-${conv.messages.length + 1}`,
            senderId: currentUserId,
            senderName: currentUserName,
            content: content,
            createdAt: new Date(),
          };
          const updatedConv = {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessageAt: new Date(), // Son mesajlaşma tarihini güncelle
          };
          // dummyConversations'ı da güncelle
          const dummyIndex = dummyConversations.findIndex(d => d.id === conv.id);
          if (dummyIndex !== -1) {
            dummyConversations[dummyIndex] = updatedConv;
          }
          return updatedConv;
        }
        return conv;
      });
      // En son mesajlaşma tarihine göre yeniden sırala
      return updatedConversations.sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
    });
  };

  const handleAddConversation = (newSubject: string, participantIds: string[]) => {
    const newConvId = `CONV-${Date.now()}`;
    const participants = participantIds.map(id => {
      const user = dummyUsers.find(u => u.id === id);
      return user ? { id: user.id, name: user.username, role: user.role } : { id: id, name: "Bilinmeyen", role: "viewer" };
    });
    // Mevcut kullanıcıyı da katılımcılara ekle
    participants.push({ id: currentUserId, name: currentUserName, role: userRole! });

    const newConversation: Conversation = {
      id: newConvId,
      subject: newSubject,
      participants: participants,
      messages: [],
      lastMessageAt: new Date(),
    };
    dummyConversations.push(newConversation); // Global dummy listeye ekle
    setConversations(prev => [newConversation, ...prev].sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()));
    setSelectedConversationId(newConvId); // Yeni konuşmayı seç
    setIsNewConversationDialogOpen(false);
    showSuccess("Yeni konuşma başlatıldı!");
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mesajlar</h1>
          <p className="text-gray-600 dark:text-gray-400">Uygulama içi mesajlaşma ile iletişimi yönetin.</p>
        </div>
        <Dialog open={isNewConversationDialogOpen} onOpenChange={setIsNewConversationDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Yeni Konuşma Başlat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Yeni Konuşma Başlat</DialogTitle>
              <DialogDescription>
                Yeni bir mesajlaşma başlatmak için konu ve katılımcıları seçin.
              </DialogDescription>
            </DialogHeader>
            <AddConversationForm onAddConversation={handleAddConversation} currentUserId={currentUserId} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="flex-1 min-h-[600px]">
        <CardContent className="p-0 h-full">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
              <div className="h-full flex flex-col border-r">
                <div className="p-4 border-b">
                  <Input
                    placeholder="Konuşma ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <ConversationList
                    conversations={filteredConversations}
                    onSelectConversation={setSelectedConversationId}
                    selectedConversationId={selectedConversationId}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
              <div className="h-full">
                {selectedConversation ? (
                  <MessageDisplay
                    conversation={selectedConversation}
                    onSendMessage={handleSendMessage}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Bir konuşma seçin veya yeni bir konuşma başlatın.
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesPage;