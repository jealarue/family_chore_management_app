import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        points: true,
        totalEarned: true,
        createdAt: true,
        assignedTasks: {
          include: {
            category: true,
          },
          orderBy: {
            dueDate: "asc",
          },
        },
        completedTasks: {
          include: {
            task: {
              include: {
                category: true,
              },
            },
          },
          orderBy: {
            completedAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
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
    
    const { name, email, password, role, points, totalEarned } = body;

    const updateData: any = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password; // Store password directly (not recommended for production)
    if (role) updateData.role = role;
    if (points !== undefined) updateData.points = points;
    if (totalEarned !== undefined) updateData.totalEarned = totalEarned;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        points: true,
        totalEarned: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
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
    
    // Delete related records first
    await prisma.taskCompletion.deleteMany({
      where: { userId: id },
    });
    
    await prisma.notification.deleteMany({
      where: { userId: id },
    });
    
    await prisma.task.updateMany({
      where: { assignedToId: id },
      data: { assignedToId: null },
    });
    
    await prisma.reward.updateMany({
      where: { claimedById: id },
      data: { claimedById: null, claimedAt: null },
    });
    
    await prisma.penalty.deleteMany({
      where: { appliedToId: id },
    });
    
    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}