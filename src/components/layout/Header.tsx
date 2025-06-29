import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { dummyNotifications, Notification } from "@/data/dummyNotifications";
import { ThemeToggle } from "@/components/theme/ThemeToggle"; // ThemeToggle import edildi

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Header({ title, className, ...props }: HeaderProps) {
  const { logout, isAuthenticated, userRole } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Kullanıcı rolüne göre bildirimleri filtrele
    const filteredForRole = dummyNotifications.filter(notif =>
      notif.targetRole === 'all' || notif.targetRole === userRole
    );
    setNotifications(filteredForRole);
  }, [userRole]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    // Dummy veriyi de güncelle
    const dummyIndex = dummyNotifications.findIndex(n => n.id === id);
    if (dummyIndex !== -1) {
      dummyNotifications[dummyIndex].read = true;
    }
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.filter(n => n.read)); // Sadece okunmamışları bırak
    // Dummy veriden de sil
    for (let i = dummyNotifications.length - 1; i >= 0; i--) {
      if (dummyNotifications[i].read) {
        dummyNotifications.splice(i, 1);
      }
    }
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 px-6 border-b bg-background text-foreground",
        className
      )}
      {...props}
    >
      <h1 className="text-xl font-semibold">{title || "Acme Güvenlik Yönetim Paneli"}</h1>
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            <ThemeToggle /> {/* ThemeToggle buraya eklendi */}
            <NotificationBell
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAllNotifications}
            />
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
            </Button>
          </>
        )}
      </div>
    </header>
  );
}