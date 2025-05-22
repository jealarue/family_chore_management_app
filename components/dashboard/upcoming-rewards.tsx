"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Gift } from "lucide-react";
import { formatMoney } from "@/lib/utils";

interface Reward {
  id: string;
  title: string;
  pointsCost: number;
  moneyCost: number;
  description?: string;
}

interface UpcomingRewardsProps {
  rewards: Reward[];
  userPoints: number;
}

export function UpcomingRewards({ rewards, userPoints }: UpcomingRewardsProps) {
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

  return (
    <div
      ref={ref}
      className="dashboard-card"
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Available Rewards</CardTitle>
            <Link href="/rewards">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rewards.length > 0 ? (
              rewards.map((reward, index) => (
                <div
                  key={reward.id}
                  className={`flex items-center justify-between rounded-lg border p-3 hover:bg-accent transition-colors ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '500ms'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Gift className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{reward.title}</div>
                      {reward.description && (
                        <div className="text-xs text-muted-foreground">
                          {reward.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-sm font-medium">
                      {reward.pointsCost} points
                    </div>
                    {reward.moneyCost > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {formatMoney(reward.moneyCost)}
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant={userPoints >= reward.pointsCost ? "success" : "outline"}
                      disabled={userPoints < reward.pointsCost}
                    >
                      {userPoints >= reward.pointsCost ? "Claim" : "Not Enough Points"}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No rewards available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}