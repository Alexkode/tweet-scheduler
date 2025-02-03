import { Calendar, Home, Plus, Clock, Users, Settings, Sun, Moon, Menu } from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "New Post", icon: Plus, path: "/new-post" },
  { title: "Scheduled", icon: Clock, path: "/scheduled" },
  { title: "Accounts", icon: Users, path: "/accounts" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <SidebarComponent>
      <SidebarContent>
        <div className="relative flex items-center p-4">
          <h1 className="text-2xl font-bold text-primary">SocialManager</h1>
          <div className="absolute right-4 top-4 z-50">
            <SidebarTrigger />
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;