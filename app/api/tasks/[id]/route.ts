import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        assignedTo: true,
        category: true,
        completions: {
          include: {
            user: true,
          },
          orderBy: {
            completedAt: "desc",
          },
        },
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    const { title, description, pointsValue, monetaryValue, dueDate, assignedToId, categoryId, recurring, recurringPeriod } = body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        pointsValue,
        monetaryValue,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedToId,
        categoryId,
        recurring,
        recurringPeriod,
      },
      include: {
        assignedTo: true,
        category: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    await prisma.taskCompletion.deleteMany({
      where: { taskId: id },
    });
    
    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}