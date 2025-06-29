import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Package, ReceiptText, ShoppingCart, User, Settings, UserCog, BarChart, Megaphone, TicketIcon, Bell, Rss, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next"; // useTranslation hook'u eklendi

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const location = useLocation();
  const { userRole } = useAuth();
  const { t } = useTranslation(); // useTranslation hook'unu kullan

  const adminNavItems = [
    {
      title: t("sidebar.dashboard"),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("sidebar.dealers"),
      href: "/dealers",
      icon: Users,
    },
    {
      title: t("sidebar.stock"),
      href: "/stock",
      icon: Package,
    },
    {
      title: t("sidebar.invoices"),
      href: "/invoices",
      icon: ReceiptText,
    },
    {
      title: t("sidebar.orders"),
      href: "/orders",
      icon: ShoppingCart,
    },
    {
      title: t("sidebar.users"),
      href: "/users",
      icon: UserCog,
    },
    {
      title: t("sidebar.reports"),
      href: "/reports",
      icon: BarChart,
    },
    {
      title: t("sidebar.announcements"),
      href: "/announcements",
      icon: Megaphone,
    },
    {
      title: t("sidebar.supportTickets"),
      href: "/admin-tickets",
      icon: TicketIcon,
    },
    {
      title: t("sidebar.notifications"),
      href: "/notifications",
      icon: Bell,
    },
    {
      title: t("sidebar.blog"),
      href: "/blog",
      icon: Rss,
    },
    {
      title: t("sidebar.pages"),
      href: "/admin-pages",
      icon: FileText,
    },
    {
      title: t("sidebar.settings"),
      href: "/settings",
      icon: Settings,
    },
    {
      title: t("sidebar.myAccount"),
      href: "/account",
      icon: User,
    },
  ];

  const dealerNavItems = [
    {
      title: t("sidebar.dealerPanel"),
      href: "/dealer-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("sidebar.myOrders"),
      href: "/dealer-orders",
      icon: ShoppingCart,
    },
    {
      title: t("sidebar.productCatalog"),
      href: "/dealer-stock",
      icon: Package,
    },
    {
      title: t("sidebar.myInvoices"),
      href: "/dealer-invoices",
      icon: ReceiptText,
    },
    {
      title: t("sidebar.mySupportTickets"),
      href: "/dealer-tickets",
      icon: TicketIcon,
    },
    {
      title: t("sidebar.notifications"),
      href: "/notifications",
      icon: Bell,
    },
    {
      title: t("sidebar.blog"),
      href: "/blog",
      icon: Rss,
    },
    {
      title: t("sidebar.pages"),
      href: "/pages/hakkimizda",
      icon: FileText,
    },
    {
      title: t("sidebar.myProfile"),
      href: "/dealer-profile",
      icon: User,
    },
    {
      title: t("sidebar.myAccount"),
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