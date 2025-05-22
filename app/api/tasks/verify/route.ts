import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { completionId, verifiedById, approved, qualityRating, notes } = body;

    if (!completionId || !verifiedById) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the task completion details
    const taskCompletion = await prisma.taskCompletion.findUnique({
      where: { id: completionId },
      include: {
        task: true,
        user: true,
      },
    });

    if (!taskCompletion) {
      return NextResponse.json(
        { error: "Task completion not found" },
        { status: 404 }
      );
    }

    // If not approved, we need to revert the points and money
    if (!approved) {
      // Update user points (revert)
      await prisma.user.update({
        where: { id: taskCompletion.userId },
        data: {
          points: { decrement: taskCompletion.pointsEarned },
          totalEarned: { decrement: taskCompletion.moneyEarned },
        },
      });

      // Create notification for user
      await prisma.notification.create({
        data: {
          title: "Task Rejected",
          message: `Your task "${taskCompletion.task.title}" was not approved. ${notes || ""}`,
          userId: taskCompletion.userId,
        },
      });

      // Delete the task completion
      await prisma.taskCompletion.delete({
        where: { id: completionId },
      });

      return NextResponse.json({ success: true, approved: false });
    }

    // If approved, update the verification details
    const updatedCompletion = await prisma.taskCompletion.update({
      where: { id: completionId },
      data: {
        verifiedAt: new Date(),
        verifiedById,
        quality: qualityRating || taskCompletion.quality,
        notes: notes || taskCompletion.notes,
      },
      include: {
        task: true,
        user: true,
      },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        title: "Task Approved",
        message: `Your task "${taskCompletion.task.title}" has been approved! You earned ${taskCompletion.pointsEarned} points and $${taskCompletion.moneyEarned.toFixed(2)}.`,
        userId: taskCompletion.userId,
      },
    });

    return NextResponse.json(updatedCompletion);
  } catch (error) {
    console.error("Error verifying task:", error);
    return NextResponse.json(
      { error: "Failed to verify task" },
      { status: 500 }
    );
  }
}