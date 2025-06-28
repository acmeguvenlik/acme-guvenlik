import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // useAuth hook'unu import et

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Header({ title, className, ...props }: HeaderProps) {
  const { logout, isAuthenticated } = useAuth(); // logout ve isAuthenticated'ı kullan

  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 px-6 border-b bg-background text-foreground",
        className
      )}
      {...props}
    >
      <h1 className="text-xl font-semibold">{title || "Acme Güvenlik Yönetim Paneli"}</h1>
      <div>
        {isAuthenticated && ( // Sadece giriş yapılmışsa çıkış butonunu göster
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
          </Button>
        )}
      </div>
    </header>
  );
}