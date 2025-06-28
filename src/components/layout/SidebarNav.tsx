import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Package, Wallet, ReceiptText } from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const location = useLocation();

  const navItems = [
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
      title: "Cari Hesaplar",
      href: "/current-accounts",
      icon: Wallet,
    },
    {
      title: "Faturalar",
      href: "/invoices",
      icon: ReceiptText,
    },
  ];

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