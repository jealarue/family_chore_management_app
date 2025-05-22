"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateLevel, calculateProgress } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface UserProgressProps {
  points: number;
  nextRewardPoints: number;
  nextRewardName: string;
}

export function UserProgress({
  points,
  nextRewardPoints,
  nextRewardName,
}: UserProgressProps) {
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
  
  const level = calculateLevel(points);
  const progress = calculateProgress(points);
  const pointsToNextLevel = 100 - progress;
  
  const progressToNextReward = Math.min(
    Math.round((points / nextRewardPoints) * 100),
    100
  );

  return (
    <div
      ref={ref}
      className={`dashboard-card transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Level {level}</div>
              <div className="text-sm text-muted-foreground">
                {pointsToNextLevel} points to Level {level + 1}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Next Reward: {nextRewardName}</div>
              <div className="text-sm text-muted-foreground">
                {nextRewardPoints - points} points needed
              </div>
            </div>
            <Progress value={progressToNextReward} className="h-2" />
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{points}</div>
              <div className="text-xs text-muted-foreground">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}