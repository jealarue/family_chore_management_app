import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rewardId, userId } = body;

    if (!rewardId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the reward
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      return NextResponse.json(
        { error: "Reward not found" },
        { status: 404 }
      );
    }

    if (!reward.isActive) {
      return NextResponse.json(
        { error: "Reward is not active" },
        { status: 400 }
      );
    }

    if (reward.claimedById) {
      return NextResponse.json(
        { error: "Reward has already been claimed" },
        { status: 400 }
      );
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user has enough points
    if (user.points < reward.pointsCost) {
      return NextResponse.json(
        { error: "Not enough points to claim this reward" },
        { status: 400 }
      );
    }

    // Update user points
    await prisma.user.update({
      where: { id: userId },
      data: {
        points: { decrement: reward.pointsCost },
      },
    });

    // Update reward as claimed
    const claimedReward = await prisma.reward.update({
      where: { id: rewardId },
      data: {
        claimedById: userId,
        claimedAt: new Date(),
      },
      include: {
        claimedBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Create notification for admin
    await prisma.notification.create({
      data: {
        title: "Reward Claimed",
        message: `${user.name} has claimed the reward: ${reward.title}`,
        userId: "1", // Assuming admin has ID 1
      },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        title: "Reward Claimed",
        message: `You have successfully claimed: ${reward.title}`,
        userId,
      },
    });

    return NextResponse.json(claimedReward);
  } catch (error) {
    console.error("Error claiming reward:", error);
    return NextResponse.json(
      { error: "Failed to claim reward" },
      { status: 500 }
    );
  }
}