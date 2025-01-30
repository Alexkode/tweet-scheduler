import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary">
        <Sidebar />
        <main className="flex-1 p-6 ml-[240px]">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;