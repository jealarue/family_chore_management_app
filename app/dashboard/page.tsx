import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import { LeaderboardPreview } from "@/components/dashboard/leaderboard-preview";
import { UpcomingRewards } from "@/components/dashboard/upcoming-rewards";
import { UserProgress } from "@/components/dashboard/user-progress";
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Trophy,
  Star
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Mock data - in a real app, this would come from the database
  const user = {
    id: "1",
    name: "Parent Admin",
    email: "parent@example.com",
    role: "ADMIN",
    points: 0,
  };
  
  const stats = [
    {
      title: "Completed Tasks",
      value: 24,
      icon: <CheckCircle className="h-4 w-4" />,
      description: "This week",
      change: 12,
      changeType: "increase" as const,
    },
    {
      title: "Pending Tasks",
      value: 7,
      icon: <Clock className="h-4 w-4" />,
      description: "Awaiting completion",
    },
    {
      title: "Total Earned",
      value: 45.5,
      icon: <DollarSign className="h-4 w-4" />,
      description: "This month",
      isMoney: true,
      change: 8,
      changeType: "increase" as const,
    },
    {
      title: "Total Points",
      value: 1250,
      icon: <Star className="h-4 w-4" />,
      description: "Family total",
      change: 15,
      changeType: "increase" as const,
    },
  ];
  
  const recentTasks = [
    {
      id: "task1",
      title: "Clean Bedroom",
      status: "completed" as const,
      dueDate: "2023-06-15T10:00:00Z",
      assignedTo: "Emma",
      pointsValue: 20,
    },
    {
      id: "task2",
      title: "Take Out Trash",
      status: "pending" as const,
      dueDate: "2023-06-16T18:00:00Z",
      assignedTo: "Jack",
      pointsValue: 10,
    },
    {
      id: "task3",
      title: "Do Homework",
      status: "overdue" as const,
      dueDate: "2023-06-14T17:00:00Z",
      assignedTo: "Sophia",
      pointsValue: 15,
    },
    {
      id: "task4",
      title: "Wash Dishes",
      status: "completed" as const,
      dueDate: "2023-06-15T19:30:00Z",
      assignedTo: "Noah",
      pointsValue: 15,
    },
  ];
  
  const leaderboardUsers = [
    {
      id: "user1",
      name: "Emma",
      points: 450,
      avatarUrl: "",
    },
    {
      id: "user2",
      name: "Jack",
      points: 380,
      avatarUrl: "",
    },
    {
      id: "user3",
      name: "Sophia",
      points: 320,
      avatarUrl: "",
    },
    {
      id: "user4",
      name: "Noah",
      points: 290,
      avatarUrl: "",
    },
  ];
  
  const rewards = [
    {
      id: "reward1",
      title: "Movie Night",
      pointsCost: 100,
      moneyCost: 0,
      description: "Choose a movie for family night",
    },
    {
      id: "reward2",
      title: "Extra Screen Time",
      pointsCost: 50,
      moneyCost: 0,
      description: "30 minutes of extra screen time",
    },
    {
      id: "reward3",
      title: "Cash Reward",
      pointsCost: 200,
      moneyCost: 10,
      description: "Convert points to cash",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        notificationCount={3}
      />
      
      <main className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
              isMoney={stat.isMoney}
              change={stat.change}
              changeType={stat.changeType}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RecentTasks tasks={recentTasks} />
          </div>
          <div>
            <UserProgress 
              points={user.role === "ADMIN" ? 0 : leaderboardUsers.find(u => u.name === user.name)?.points || 0}
              nextRewardPoints={50}
              nextRewardName="Extra Screen Time"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeaderboardPreview users={leaderboardUsers} />
          <UpcomingRewards 
            rewards={rewards} 
            userPoints={user.role === "ADMIN" ? 0 : leaderboardUsers.find(u => u.name === user.name)?.points || 0}
          />
        </div>
      </main>
    </div>
  );
}