"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  status: "completed" | "pending" | "overdue";
  dueDate?: string;
  assignedTo: string;
  pointsValue: number;
}

interface RecentTasksProps {
  tasks: Task[];
}

export function RecentTasks({ tasks }: RecentTasksProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className="dashboard-card transition-all duration-300"
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Tasks</CardTitle>
            <Link href="/tasks">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div
                  key={task.id}
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
                      {getStatusIcon(task.status)}
                    </div>
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Assigned to: {task.assignedTo}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {getStatusBadge(task.status)}
                    {task.dueDate && (
                      <div className="text-xs text-muted-foreground">
                        {formatDate(task.dueDate)}
                      </div>
                    )}
                    <div className="text-xs font-medium text-primary">
                      {task.pointsValue} points
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No recent tasks found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}