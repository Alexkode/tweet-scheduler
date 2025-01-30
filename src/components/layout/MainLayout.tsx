import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-end mb-4">
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;