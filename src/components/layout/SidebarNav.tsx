import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Package, ReceiptText, ShoppingCart, User, Settings } from "lucide-react"; // Wallet iconu kaldırıldı
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
      title: "Bayiler", // Artık cari hesapları da içeriyor
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
      title: "Ayarlar",
      href: "/settings",
      icon: Settings,
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
      title: "Profilim",
      href: "/dealer-profile",
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
            variant={isActive ? "secondary" : "ghost"}
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