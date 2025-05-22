import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taskId, userId, quality, notes } = body;

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the task
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    // Check if task is already completed by this user
    const existingCompletion = await prisma.taskCompletion.findFirst({
      where: {
        taskId,
        userId,
      },
    });

    if (existingCompletion) {
      return NextResponse.json(
        { error: "Task already completed by this user" },
        { status: 400 }
      );
    }

    // Create task completion
    const taskCompletion = await prisma.taskCompletion.create({
      data: {
        taskId,
        userId,
        pointsEarned: task.pointsValue,
        moneyEarned: task.monetaryValue,
        quality: quality || 3,
        notes,
      },
      include: {
        task: true,
        user: true,
      },
    });

    // Update user points and money
    await prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: task.pointsValue },
        totalEarned: { increment: task.monetaryValue },
      },
    });

    // If task is recurring, create a new task
    if (task.recurring && task.recurringPeriod) {
      let nextDueDate = null;
      
      if (task.dueDate) {
        nextDueDate = new Date(task.dueDate);
        
        switch (task.recurringPeriod) {
          case "daily":
            nextDueDate.setDate(nextDueDate.getDate() + 1);
            break;
          case "weekly":
            nextDueDate.setDate(nextDueDate.getDate() + 7);
            break;
          case "monthly":
            nextDueDate.setMonth(nextDueDate.getMonth() + 1);
            break;
          default:
            break;
        }
      }
      
      await prisma.task.create({
        data: {
          title: task.title,
          description: task.description,
          pointsValue: task.pointsValue,
          monetaryValue: task.monetaryValue,
          dueDate: nextDueDate,
          assignedToId: task.assignedToId,
          categoryId: task.categoryId,
          recurring: true,
          recurringPeriod: task.recurringPeriod,
        },
      });
    }

    // Create notification for admin
    await prisma.notification.create({
      data: {
        title: "Task Completed",
        message: `${taskCompletion.user.name} has completed the task: ${task.title}`,
        userId: "1", // Assuming admin has ID 1
      },
    });

    return NextResponse.json(taskCompletion);
  } catch (error) {
    console.error("Error completing task:", error);
    return NextResponse.json(
      { error: "Failed to complete task" },
      { status: 500 }
    );
  }
}