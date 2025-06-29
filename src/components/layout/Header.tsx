import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, Globe, Menu } from "lucide-react"; // Menu iconu eklendi
import { useAuth } from "@/context/AuthContext";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { dummyNotifications, Notification } from "@/data/dummyNotifications";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onMenuClick?: () => void; // Yeni prop
}

export function Header({ title, className, onMenuClick, ...props }: HeaderProps) {
  const { logout, isAuthenticated, userRole } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const filteredForRole = dummyNotifications.filter(notif =>
      notif.targetRole === 'all' || notif.targetRole === userRole
    );
    setNotifications(filteredForRole);
  }, [userRole]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    const dummyIndex = dummyNotifications.findIndex(n => n.id === id);
    if (dummyIndex !== -1) {
      dummyNotifications[dummyIndex].read = true;
    }
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.filter(n => n.read));
    for (let i = dummyNotifications.length - 1; i >= 0; i--) {
      if (dummyNotifications[i].read) {
        dummyNotifications.splice(i, 1);
      }
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 px-4 md:px-6 border-b bg-background text-foreground", // Mobil için padding ayarı
        className
      )}
      {...props}
    >
      <div className="flex items-center">
        {/* Mobil menü butonu */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0 mr-2 md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menüyü Aç</span>
        </Button>
        <h1 className="text-xl font-semibold">{t('common.appTitle')}</h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4"> {/* Mobil için spacing ayarı */}
        {isAuthenticated && (
          <>
            <ThemeToggle />
            <NotificationBell
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAllNotifications}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t('common.changeLanguage')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('tr')}>
                  Türkçe
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">{t('common.logout')}</span> {/* Küçük ekranlarda sadece ikon */}
            </Button>
          </>
        )}
      </div>
    </header>
  );
}