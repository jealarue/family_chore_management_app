"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  isMoney?: boolean;
  change?: number;
  changeType?: "increase" | "decrease";
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  isMoney = false,
  change,
  changeType,
}: StatsCardProps) {
  const [count, setCount] = useState(0);
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

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className="stats-card transition-all duration-300 hover:-translate-y-1"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isMoney ? formatMoney(count) : count}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {change !== undefined && (
            <div
              className={`mt-2 flex items-center text-xs ${
                changeType === "increase"
                  ? "text-success"
                  : "text-destructive"
              }`}
            >
              {changeType === "increase" ? "↑" : "↓"} {change}%
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}