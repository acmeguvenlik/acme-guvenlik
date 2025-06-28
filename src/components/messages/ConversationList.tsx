import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Conversation } from '@/data/dummyMessages';
import { useAuth } from '@/context/AuthContext';

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (conversationId: string) => void;
  selectedConversationId: string | null;
}

export function ConversationList({ conversations, onSelectConversation, selectedConversationId }: ConversationListProps) {
  const { userRole } = useAuth();

  // Mevcut kullanıcıya göre katılımcı adını bulma
  const getParticipantName = (conversation: Conversation) => {
    const otherParticipant = conversation.participants.find(p => {
      // Admin ise, diğer katılımcı bayidir. Bayi ise, diğer katılımcı admindir.
      if (userRole === 'admin') return p.role === 'dealer';
      if (userRole === 'dealer') return p.role === 'admin';
      return false; // Diğer roller için şimdilik destek yok
    });
    return otherParticipant ? otherParticipant.name : "Bilinmeyen Kullanıcı";
  };

  return (
    <div className="space-y-2">
      {conversations.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">Henüz bir konuşma bulunmamaktadır.</p>
      ) : (
        conversations.map((conv) => (
          <Card
            key={conv.id}
            className={`cursor-pointer hover:bg-accent transition-colors ${
              selectedConversationId === conv.id ? 'bg-accent border-primary' : ''
            }`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <CardContent className="p-4 flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getParticipantName(conv)}`} />
                <AvatarFallback>{getParticipantName(conv).substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-semibold text-base truncate">{getParticipantName(conv)}</h3>
                <p className="text-sm text-muted-foreground truncate">{conv.subject}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(conv.lastMessageAt, { addSuffix: true, locale: tr })}
                </p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}