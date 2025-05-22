import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const assignedTo = searchParams.get("assignedTo");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    
    const whereClause: any = {};
    
    if (assignedTo) {
      whereClause.assignedToId = assignedTo;
    }
    
    if (category) {
      whereClause.categoryId = category;
    }
    
    if (status === "completed") {
      whereClause.completions = {
        some: {}
      };
    } else if (status === "pending") {
      whereClause.completions = {
        none: {}
      };
      if (whereClause.dueDate) {
        whereClause.dueDate = {
          gte: new Date()
        };
      }
    } else if (status === "overdue") {
      whereClause.completions = {
        none: {}
      };
      whereClause.dueDate = {
        lt: new Date()
      };
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
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
          take: 1,
        },
      },
      orderBy: [
        {
          dueDate: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, pointsValue, monetaryValue, dueDate, assignedToId, categoryId, recurring, recurringPeriod } = body;

    if (!title || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        pointsValue: pointsValue || 10,
        monetaryValue: monetaryValue || 0,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedToId,
        categoryId,
        recurring: recurring || false,
        recurringPeriod,
      },
      include: {
        assignedTo: true,
        category: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}