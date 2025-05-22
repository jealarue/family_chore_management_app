import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const penalties = await prisma.penalty.findMany({
      include: {
        appliedTo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(penalties);
  } catch (error) {
    console.error("Error fetching penalties:", error);
    return NextResponse.json(
      { error: "Failed to fetch penalties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, pointsLost, moneyLost, appliedToId, reason } = body;

    if (!title || !appliedToId || pointsLost === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: appliedToId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Create the penalty
    const penalty = await prisma.penalty.create({
      data: {
        title,
        description,
        pointsLost,
        moneyLost: moneyLost || 0,
        appliedToId,
        reason,
      },
      include: {
        appliedTo: true,
      },
    });

    // Update user points and money
    await prisma.user.update({
      where: { id: appliedToId },
      data: {
        points: { decrement: pointsLost },
        totalEarned: { decrement: moneyLost || 0 },
      },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        title: "Penalty Applied",
        message: `A penalty has been applied: ${title}. ${reason ? `Reason: ${reason}` : ""}`,
        userId: appliedToId,
      },
    });

    return NextResponse.json(penalty);
  } catch (error) {
    console.error("Error creating penalty:", error);
    return NextResponse.json(
      { error: "Failed to create penalty" },
      { status: 500 }
    );
  }
}