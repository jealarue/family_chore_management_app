"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  Trophy, 
  Gift, 
  Users, 
  Settings, 
  BarChart3,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface MainNavProps {
  className?: string;
  notificationCount?: number;
}

export function MainNav({ className, notificationCount = 0 }: MainNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: <CheckSquare className="h-5 w-5" />,
      active: pathname === "/tasks" || pathname.startsWith("/tasks/"),
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      active: pathname === "/calendar",
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: <Trophy className="h-5 w-5" />,
      active: pathname === "/leaderboard",
    },
    {
      href: "/rewards",
      label: "Rewards",
      icon: <Gift className="h-5 w-5" />,
      active: pathname === "/rewards" || pathname.startsWith("/rewards/"),
    },
    {
      href: "/family",
      label: "Family",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/family" || pathname.startsWith("/family/"),
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      active: pathname === "/analytics",
    },
    {
      href: "/notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      active: pathname === "/notifications",
      badge: notificationCount > 0 ? notificationCount : undefined,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === "/settings",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "nav-link relative",
            route.active ? "active" : ""
          )}
        >
          {route.icon}
          <span className="hidden md:block">{route.label}</span>
          {route.badge && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
            >
              {route.badge}
            </Badge>
          )}
          {route.active && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
              layoutId="navbar-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}