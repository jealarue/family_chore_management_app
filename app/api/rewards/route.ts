import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rewards = await prisma.reward.findMany({
      include: {
        claimedBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        pointsCost: "asc",
      },
    });

    return NextResponse.json(rewards);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return NextResponse.json(
      { error: "Failed to fetch rewards" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, pointsCost, moneyCost, isActive } = body;

    if (!title || pointsCost === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reward = await prisma.reward.create({
      data: {
        title,
        description,
        pointsCost,
        moneyCost: moneyCost || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(reward);
  } catch (error) {
    console.error("Error creating reward:", error);
    return NextResponse.json(
      { error: "Failed to create reward" },
      { status: 500 }
    );
  }
}