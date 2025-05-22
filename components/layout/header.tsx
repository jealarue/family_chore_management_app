"use client";

import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { UserNav } from "@/components/layout/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    points?: number;
  };
  notificationCount?: number;
}

export function Header({ user, notificationCount = 0 }: HeaderProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 10);
    });

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">FC</span>
              </span>
              <span className="ml-2 text-xl font-bold hidden md:inline-block">
                FamilyChores
              </span>
            </motion.div>
          </Link>
        </div>
        <MainNav className="mx-6" notificationCount={notificationCount} />
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserNav user={user} />
        </div>
      </div>
    </motion.header>
  );
}