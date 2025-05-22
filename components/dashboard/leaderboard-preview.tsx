"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { calculateLevel, calculateProgress, getInitials } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";

interface User {
  id: string;
  name: string;
  points: number;
  avatarUrl?: string;
}

interface LeaderboardPreviewProps {
  users: User[];
}

export function LeaderboardPreview({ users }: LeaderboardPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-500";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-700";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      ref={ref}
      className="dashboard-card"
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Leaderboard</CardTitle>
            <Link href="/leaderboard">
              <Button variant="outline" size="sm">
                View Full
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center gap-4 rounded-lg border p-3 hover:bg-accent transition-colors ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '500ms'
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center font-bold">
                  {index < 3 ? (
                    <Trophy className={`h-5 w-5 ${getMedalColor(index)}`} />
                  ) : (
                    <span className="text-muted-foreground">{index + 1}</span>
                  )}
                </div>
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm font-medium">{user.points} pts</div>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Progress
                      value={calculateProgress(user.points)}
                      className="h-2"
                    />
                    <span className="text-xs text-muted-foreground">
                      Lvl {calculateLevel(user.points)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}