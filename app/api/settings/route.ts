import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Get the settings or create default if not exists
    let settings = await prisma.settings.findFirst();
    
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          pointToMoneyRatio: 0.1,
          defaultTaskPoints: 10,
          bonusThreshold: 100,
          bonusAmount: 5,
          penaltyMultiplier: 0.5,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
      pointToMoneyRatio, 
      defaultTaskPoints, 
      bonusThreshold, 
      bonusAmount, 
      penaltyMultiplier 
    } = body;

    // Get the first settings record or create if not exists
    let settings = await prisma.settings.findFirst();
    
    if (settings) {
      // Update existing settings
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          pointToMoneyRatio: pointToMoneyRatio !== undefined ? pointToMoneyRatio : settings.pointToMoneyRatio,
          defaultTaskPoints: defaultTaskPoints !== undefined ? defaultTaskPoints : settings.defaultTaskPoints,
          bonusThreshold: bonusThreshold !== undefined ? bonusThreshold : settings.bonusThreshold,
          bonusAmount: bonusAmount !== undefined ? bonusAmount : settings.bonusAmount,
          penaltyMultiplier: penaltyMultiplier !== undefined ? penaltyMultiplier : settings.penaltyMultiplier,
        },
      });
    } else {
      // Create new settings
      settings = await prisma.settings.create({
        data: {
          pointToMoneyRatio: pointToMoneyRatio !== undefined ? pointToMoneyRatio : 0.1,
          defaultTaskPoints: defaultTaskPoints !== undefined ? defaultTaskPoints : 10,
          bonusThreshold: bonusThreshold !== undefined ? bonusThreshold : 100,
          bonusAmount: bonusAmount !== undefined ? bonusAmount : 5,
          penaltyMultiplier: penaltyMultiplier !== undefined ? penaltyMultiplier : 0.5,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}