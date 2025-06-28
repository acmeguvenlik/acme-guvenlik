import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { SidebarNav } from "./SidebarNav";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Header } from "./Header";
import { useAuth } from "@/context/AuthContext"; // useAuth hook'unu import et

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, logout } = useAuth(); // isAuthenticated ve logout'u kullan

  if (!isAuthenticated) {
    // Eğer kullanıcı giriş yapmamışsa, MainLayout'u render etme
    // Bu durum App.tsx'deki ProtectedRoute tarafından zaten ele alınacak,
    // ancak burada ekstra bir güvenlik katmanı veya hata ayıklama için tutulabilir.
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
    </div>
  );
}