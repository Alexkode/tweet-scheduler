import { 
  Home, Plus, Clock, Users, Settings, Sun, Moon, 
  CreditCard, Bell, LogOut, ChevronUp, ChevronDown 
} from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "New Post", icon: Plus, path: "/new-post" },
  { title: "Scheduled", icon: Clock, path: "/scheduled" },
  { title: "Accounts", icon: Users, path: "/accounts" },
];

const settingsMenuItems = [
  { title: "Account", icon: Settings, path: "/settings" },
  { title: "Billing", icon: CreditCard, path: "/settings/billing" },
  { title: "Notifications", icon: Bell, path: "/settings/notifications" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const userEmail = user?.email || '';
  const userInitials = userEmail.substring(0, 2).toUpperCase();

  return (
    <SidebarComponent>
      <SidebarContent>
        <div className="relative flex items-center p-4">
          <h1 className="text-2xl font-bold text-primary">SocialManager</h1>
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
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{userEmail}</span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {settingsMenuItems.map((item) => (
                <DropdownMenuItem key={item.title} onClick={() => navigate(item.path)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={signOut} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;