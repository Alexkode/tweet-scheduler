import { Calendar, Home, Plus, Clock, Users } from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "New Post", icon: Plus, path: "/new-post" },
  { title: "Scheduled", icon: Clock, path: "/scheduled" },
  { title: "Accounts", icon: Users, path: "/accounts" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <SidebarComponent>
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">SocialManager</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;