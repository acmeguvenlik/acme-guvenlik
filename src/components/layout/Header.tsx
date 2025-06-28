import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Header({ title, className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 px-6 border-b bg-background text-foreground",
        className
      )}
      {...props}
    >
      <h1 className="text-xl font-semibold">{title || "Acme Güvenlik Yönetim Paneli"}</h1>
      {/* Buraya kullanıcı menüsü, bildirimler veya diğer global öğeler eklenebilir */}
      <div>
        {/* Örneğin: <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button> */}
        {/* Örneğin: <Avatar><AvatarFallback>CN</AvatarFallback></Avatar> */}
      </div>
    </header>
  );
}