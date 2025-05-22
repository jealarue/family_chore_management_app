import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month";
    const userId = searchParams.get("userId");

    let startDate = new Date();
    
    // Set the start date based on the period
    switch (period) {
      case "week":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
    }

    // Base query conditions
    const whereCondition: any = {
      completedAt: {
        gte: startDate,
      },
    };

    // Add user filter if provided
    if (userId) {
      whereCondition.userId = userId;
    }

    // Get task completions
    const taskCompletions = await prisma.taskCompletion.findMany({
      where: whereCondition,
      include: {
        task: {
          include: {
            category: true,
          },
        },
        user: true,
      },
      orderBy: {
        completedAt: "asc",
      },
    });

    // Calculate statistics
    const totalTasks = taskCompletions.length;
    const totalPoints = taskCompletions.reduce((sum, tc) => sum + tc.pointsEarned, 0);
    const totalMoney = taskCompletions.reduce((sum, tc) => sum + tc.moneyEarned, 0);
    
    // Group by user
    const userStats = taskCompletions.reduce((acc: any, tc) => {
      const userId = tc.userId;
      if (!acc[userId]) {
        acc[userId] = {
          userId,
          userName: tc.user.name,
          tasks: 0,
          points: 0,
          money: 0,
        };
      }
      acc[userId].tasks += 1;
      acc[userId].points += tc.pointsEarned;
      acc[userId].money += tc.moneyEarned;
      return acc;
    }, {});
    
    // Group by category
    const categoryStats = taskCompletions.reduce((acc: any, tc) => {
      const categoryId = tc.task.categoryId;
      const categoryName = tc.task.category.name;
      if (!acc[categoryId]) {
        acc[categoryId] = {
          categoryId,
          categoryName,
          tasks: 0,
          points: 0,
        };
      }
      acc[categoryId].tasks += 1;
      acc[categoryId].points += tc.pointsEarned;
      return acc;
    }, {});
    
    // Group by day for time series
    const timeSeriesData = taskCompletions.reduce((acc: any, tc) => {
      const date = tc.completedAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          tasks: 0,
          points: 0,
          money: 0,
        };
      }
      acc[date].tasks += 1;
      acc[date].points += tc.pointsEarned;
      acc[date].money += tc.moneyEarned;
      return acc;
    }, {});

    return NextResponse.json({
      summary: {
        totalTasks,
        totalPoints,
        totalMoney,
      },
      userStats: Object.values(userStats),
      categoryStats: Object.values(categoryStats),
      timeSeriesData: Object.values(timeSeriesData),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}