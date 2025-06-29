import React from "react"; // React import edildi
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { SidebarNav } from "./SidebarNav";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Header } from "./Header";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setIsSheetOpen(true)} />
      {isMobile ? (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex h-full flex-col justify-between bg-sidebar text-sidebar-foreground">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-6 text-sidebar-primary">Acme Güvenlik</h2>
                <SidebarNav />
              </div>
              <MadeWithDyad />
            </div>
          </SheetContent>
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
          </div>
        </Sheet>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          <ResizablePanel defaultSize={15} minSize={10} maxSize={20}>
            <div className="flex h-full flex-col justify-between border-r bg-sidebar text-sidebar-foreground">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-6 text-sidebar-primary">Acme Güvenlik</h2>
                <SidebarNav />
              </div>
              <MadeWithDyad />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85}>
            <div className="flex-1 overflow-auto p-6">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}