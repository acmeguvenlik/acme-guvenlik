import React from "react";
import { Bell, XCircle, CheckCircle, Info, TriangleAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Notification } from "@/data/dummyNotifications";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale"; // Türkçe dil desteği için

interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationBell({ notifications, onMarkAsRead, onClearAll }: NotificationBellProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <TriangleAlert className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 w-8 px-0">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Bildirimler</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <h3 className="font-semibold">Bildirimler ({unreadCount} okunmamış)</h3>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs text-muted-foreground">
              Tümünü Temizle
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.slice(0, 5).map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-2 cursor-pointer" onClick={() => onMarkAsRead(notification.id)}>
              <Link to={notification.link || "#"} className="w-full">
                <div className="flex items-center w-full">
                  {getIcon(notification.type)}
                  <div className="ml-2 flex-1">
                    <p className={`font-medium ${notification.read ? 'text-muted-foreground' : ''}`}>{notification.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: tr })}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="ml-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-center text-muted-foreground">
            Henüz bildirim yok.
          </DropdownMenuItem>
        )}
        {notifications.length > 5 && (
          <DropdownMenuSeparator />
        )}
        <DropdownMenuItem asChild>
          <Link to="/notifications" className="w-full text-center text-blue-600 hover:underline">
            Tüm Bildirimleri Gör
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}