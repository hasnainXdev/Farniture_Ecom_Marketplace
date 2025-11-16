"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  Mail, 
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/dashboard/messages",
  },
  {
    title: "Email",
    icon: Mail,
    href: "/dashboard/email",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "pb-12 min-h-screen",
        isCollapsed ? "w-20" : "w-72",
        "transition-all duration-300 ease-in-out"
      )}>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              {!isCollapsed && <h2 className="text-lg font-semibold tracking-tight">
                Admin Panel
              </h2>}
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
              </Button>
            </div>
          </div>
          <ScrollArea className="px-1">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed ? "px-2" : "px-4",
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className={cn(
                      "h-5 w-5",
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )} />
                    {!isCollapsed && <span className="ml-2">{item.title}</span>}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}