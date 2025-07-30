"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Award,
  Trophy,
  LineChart,
  User,
  LogOut,
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  progress?: number;
  active?: boolean;
}

const NavItem = ({
  href,
  icon,
  label,
  progress = 0,
  active = false,
}: NavItemProps) => {
  return (
    <Link href={href} className="block">
      <div
        className={`flex items-center p-3 rounded-md mb-1 ${active ? "bg-accent" : "hover:bg-accent/50"}`}
      >
        <div className="mr-3 text-muted-foreground">{icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-medium">{label}</span>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1 mt-2" />
        </div>
      </div>
    </Link>
  );
};

interface SidebarProps {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}

const Sidebar = ({
  user = { name: "NBA Fan", email: "user@example.com", image: "" },
}: SidebarProps) => {
  const pathname = usePathname();

  // Mock progress data - in a real app this would come from user data
  const navItems = [
    {
      href: "/dashboard/standings",
      icon: <BarChart3 size={20} />,
      label: "Conference Standings",
      progress: 75,
    },
    {
      href: "/dashboard/all-nba",
      icon: <Trophy size={20} />,
      label: "All-NBA Teams",
      progress: 60,
    },
    {
      href: "/dashboard/awards",
      icon: <Award size={20} />,
      label: "Awards",
      progress: 40,
    },
    {
      href: "/dashboard/props",
      icon: <LineChart size={20} />,
      label: "Props",
      progress: 25,
    },
  ];

  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      {/* User profile section */}
      <div className="p-6">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={
                user.image ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=nba"
              }
              alt={user.name}
            />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Navigation section */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 px-3">
          PREDICTIONS
        </h3>
        <nav>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              progress={item.progress}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </div>

      {/* Footer section */}
      <div className="p-4 border-t">
        <div className="flex justify-between">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <User size={16} className="mr-2" />
            <span>Profile</span>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <LogOut size={16} className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
