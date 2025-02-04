import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Home, Plus, Clock, Users, Settings, 
  CreditCard, Bell, LogOut, ChevronRight
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "New Post", icon: Plus, path: "/new-post" },
  { title: "Scheduled", icon: Clock, path: "/scheduled" },
  { title: "Accounts", icon: Users, path: "/accounts" },
]

const settingsMenuItems = [
  { title: "Account", icon: Settings, path: "/settings" },
  { title: "Billing", icon: CreditCard, path: "/settings/billing" },
  { title: "Notifications", icon: Bell, path: "/settings/notifications" },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { state } = useSidebar()

  const userEmail = user?.email || ''
  const userInitials = userEmail.substring(0, 2).toUpperCase()

  return (
    <div className={cn("flex flex-col h-screen bg-card", className)}>
      <div className="flex-1 overflow-hidden">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight text-foreground">
            SocialManager
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            <div className="px-3">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start hover:bg-accent hover:text-accent-foreground",
                      window.location.pathname === item.path && 
                      "bg-accent/50 text-accent-foreground"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {state === "expanded" && item.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-foreground">
                Settings
              </h2>
              <div className="space-y-1">
                {settingsMenuItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start hover:bg-accent hover:text-accent-foreground",
                      window.location.pathname === item.path && 
                      "bg-accent/50 text-accent-foreground"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {state === "expanded" && item.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="flex-none border-t border-border bg-card p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
            >
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="" />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              {state === "expanded" && (
                <span className="truncate">{userEmail}</span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {settingsMenuItems.map((item) => (
              <DropdownMenuItem 
                key={item.title} 
                onClick={() => navigate(item.path)}
                className="hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem 
              onClick={signOut} 
              className="text-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}