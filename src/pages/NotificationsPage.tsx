import { useState, useEffect, useMemo } from "react";
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
import { Bell, CheckCircle, XCircle, Info, TriangleAlert, Trash2, MailOpen, Mail } from "lucide-react";
import { dummyNotifications, Notification } from "@/data/dummyNotifications";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { SeoHead } from "@/components/seo/SeoHead";
import { useTranslation } from "react-i18next";

const NotificationsPage = () => {
  const { userRole } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterReadStatus, setFilterReadStatus] = useState<string>("Tümü");
  const [filterType, setFilterType] = useState<string>("Tümü");
  const { t } = useTranslation();

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
    showSuccess("Bildirim okundu olarak işaretlendi.");
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    dummyNotifications.forEach(n => { n.read = true; });
    showSuccess("Tüm bildirimler okundu olarak işaretlendi.");
  };

  const handleDeleteNotification = (id: string) => {
    if (window.confirm("Bu bildirimi silmek istediğinizden emin misiniz?")) {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      const dummyIndex = dummyNotifications.findIndex(n => n.id === id);
      if (dummyIndex !== -1) {
        dummyNotifications.splice(dummyIndex, 1);
      }
      showSuccess("Bildirim başarıyla silindi!");
    }
  };

  const handleDeleteAllReadNotifications = () => {
    if (window.confirm("Okunmuş tüm bildirimleri silmek istediğinizden emin misiniz?")) {
      setNotifications((prev) => prev.filter((notif) => !notif.read));
      for (let i = dummyNotifications.length - 1; i >= 0; i--) {
        if (dummyNotifications[i].read) {
          dummyNotifications.splice(i, 1);
        }
      }
      showSuccess("Okunmuş tüm bildirimler silindi!");
    }
  };

  const filteredNotifications = useMemo(() => {
    let tempNotifications = notifications.filter(notif =>
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterReadStatus === "Okunmuş") {
      tempNotifications = tempNotifications.filter(notif => notif.read);
    } else if (filterReadStatus === "Okunmamış") {
      tempNotifications = tempNotifications.filter(notif => !notif.read);
    }

    if (filterType !== "Tümü") {
      tempNotifications = tempNotifications.filter(notif => notif.type === filterType);
    }

    return tempNotifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [notifications, searchTerm, filterReadStatus, filterType]);

  const unreadCount = filteredNotifications.filter(n => !n.read).length;
  const totalCount = filteredNotifications.length;

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
    <div className="space-y-6">
      <SeoHead title={t("sidebar.notifications")} description={t("common.notifications")} />
      <h1 className="text-3xl font-bold">{t("common.notifications")}</h1>
      <p className="text-gray-600 dark:text-gray-400">{t("common.notifications")}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("common.notifications")} ({totalCount})</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("common.notifications")} ({unreadCount})</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("common.notifications")} ({totalCount - unreadCount})</CardTitle>
            <MailOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount - unreadCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle>{t("common.notifications")}</CardTitle>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <Input
              placeholder={t("common.notifications")}
              className="max-w-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={setFilterReadStatus} defaultValue="Tümü">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder={t("common.notifications")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tümü">Tümü</SelectItem>
                <SelectItem value="Okunmuş">Okunmuş</SelectItem>
                <SelectItem value="Okunmamış">Okunmamış</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterType} defaultValue="Tümü">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder={t("common.notifications")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tümü">Tümü</SelectItem>
                <SelectItem value="info">Bilgi</SelectItem>
                <SelectItem value="success">Başarılı</SelectItem>
                <SelectItem value="warning">Uyarı</SelectItem>
                <SelectItem value="error">Hata</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleMarkAllAsRead} className="w-full sm:w-auto">
              Tümünü Okundu İşaretle
            </Button>
            <Button variant="destructive" onClick={handleDeleteAllReadNotifications} className="w-full sm:w-auto">
              Okunmuşları Sil
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto"> {/* Tabloyu duyarlı hale getir */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Tip</TableHead>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Mesaj</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <TableRow key={notification.id} className={notification.read ? "text-muted-foreground" : "font-semibold"}>
                      <TableCell>{getIcon(notification.type)}</TableCell>
                      <TableCell>{notification.title}</TableCell>
                      <TableCell>
                        {notification.link ? (
                          <Link to={notification.link} className="hover:underline">
                            {notification.message}
                          </Link>
                        ) : (
                          notification.message
                        )}
                      </TableCell>
                      <TableCell>{format(notification.createdAt, "dd.MM.yyyy HH:mm")}</TableCell>
                      <TableCell className="text-right">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mr-2"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <MailOpen className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Gösterilecek bildirim bulunmamaktadır.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;