import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Package, ReceiptText, ShoppingCart, User, Settings, UserCog, BarChart, Megaphone, TicketIcon, Bell, Rss, FileText } from "lucide-react"; // FileText iconu eklendi
import { useAuth } from "@/context/AuthContext";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const location = useLocation();
  const { userRole } = useAuth();

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Bayiler",
      href: "/dealers",
      icon: Users,
    },
    {
      title: "Stok",
      href: "/stock",
      icon: Package,
    },
    {
      title: "Faturalar",
      href: "/invoices",
      icon: ReceiptText,
    },
    {
      title: "Siparişler",
      href: "/orders",
      icon: ShoppingCart,
    },
    {
      title: "Kullanıcılar",
      href: "/users",
      icon: UserCog,
    },
    {
      title: "Raporlar",
      href: "/reports",
      icon: BarChart,
    },
    {
      title: "Duyurular",
      href: "/announcements",
      icon: Megaphone,
    },
    {
      title: "Destek Talepleri",
      href: "/admin-tickets",
      icon: TicketIcon,
    },
    {
      title: "Bildirimler",
      href: "/notifications",
      icon: Bell,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: Rss,
    },
    {
      title: "Sayfalar", // Yeni dinamik sayfa yönetimi linki
      href: "/admin-pages",
      icon: FileText,
    },
    {
      title: "Ayarlar",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Hesabım",
      href: "/account",
      icon: User,
    },
  ];

  const dealerNavItems = [
    {
      title: "Bayi Paneli",
      href: "/dealer-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Siparişlerim",
      href: "/dealer-orders",
      icon: ShoppingCart,
    },
    {
      title: "Ürün Kataloğu",
      href: "/dealer-stock",
      icon: Package,
    },
    {
      title: "Faturalarım",
      href: "/dealer-invoices",
      icon: ReceiptText,
    },
    {
      title: "Destek Taleplerim",
      href: "/dealer-tickets",
      icon: TicketIcon,
    },
    {
      title: "Bildirimler",
      href: "/notifications",
      icon: Bell,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: Rss,
    },
    {
      title: "Sayfalar", // Bayi panelinde dinamik sayfaları görüntüleme linki
      href: "/pages/hakkimizda", // Örnek olarak Hakkımızda sayfasına yönlendir
      icon: FileText,
    },
    {
      title: "Profilim",
      href: "/dealer-profile",
      icon: User,
    },
    {
      title: "Hesabım",
      href: "/account",
      icon: User,
    },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : (userRole === 'dealer' ? dealerNavItems : []);

  return (
    <nav
      className={cn(
        "flex flex-col space-y-1 p-4",
        className
      )}
      {...props}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? "default" : "ghost"}
            className="justify-start"
          >
            <Link to={item.href}>
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}