import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-secondary">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;