import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message, Conversation } from '@/data/dummyMessages';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useAuth } from '@/context/AuthContext';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { showSuccess } from '@/utils/toast';

interface MessageDisplayProps {
  conversation: Conversation;
  onSendMessage: (conversationId: string, content: string) => void;
}

export function MessageDisplay({ conversation, onSendMessage }: MessageDisplayProps) {
  const [newMessageContent, setNewMessageContent] = useState('');
  const { userRole } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]); // Mesajlar değiştiğinde aşağı kaydır

  const handleSend = () => {
    if (newMessageContent.trim()) {
      onSendMessage(conversation.id, newMessageContent);
      setNewMessageContent('');
      showSuccess("Mesajınız gönderildi!");
    }
  };

  const getSenderName = (message: Message) => {
    const participant = conversation.participants.find(p => p.id === message.senderId);
    return participant ? participant.name : message.senderName;
  };

  const isCurrentUserSender = (message: Message) => {
    // Basit bir kontrol, gerçekte AuthContext'ten gelen kullanıcı ID'si ile karşılaştırılmalı
    // Şimdilik admin için U001, bayi için D001 varsayıyoruz.
    if (userRole === 'admin' && message.senderId === 'U001') return true;
    if (userRole === 'dealer' && message.senderId === 'D001') return true;
    return false;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-xl">{conversation.subject}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Katılımcılar: {conversation.participants.map(p => p.name).join(', ')}
        </p>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-4">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${isCurrentUserSender(message) ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] p-3 rounded-lg ${
                isCurrentUserSender(message)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                <div className="font-semibold text-sm mb-1">
                  {getSenderName(message)}
                </div>
                <div dangerouslySetInnerHTML={{ __html: message.content }} className="text-sm" />
                <div className="text-xs text-right mt-1 opacity-80">
                  {format(message.createdAt, "dd.MM.yyyy HH:mm", { locale: tr })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Mesajların sonuna kaydırmak için */}
        </div>
      </CardContent>
      <div className="border-t p-4">
        <RichTextEditor
          value={newMessageContent}
          onChange={setNewMessageContent}
          placeholder="Mesajınızı buraya yazın..."
        />
        <Button onClick={handleSend} className="mt-3 w-full">Gönder</Button>
      </div>
    </Card>
  );
}