-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUB_ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "points" INTEGER NOT NULL DEFAULT 0,
    "totalEarned" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "pointsValue" INTEGER NOT NULL,
    "monetaryValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3),
    "recurring" BOOLEAN NOT NULL DEFAULT false,
    "recurringPeriod" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedToId" TEXT,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskCompletion" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),
    "verifiedById" TEXT,
    "pointsEarned" INTEGER NOT NULL,
    "moneyEarned" DOUBLE PRECISION NOT NULL,
    "quality" INTEGER DEFAULT 3,
    "notes" TEXT,

    CONSTRAINT "TaskCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#4F46E5',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "pointsCost" INTEGER NOT NULL,
    "moneyCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "claimedById" TEXT,
    "claimedAt" TIMESTAMP(3),

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penalty" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "pointsLost" INTEGER NOT NULL,
    "moneyLost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appliedToId" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "pointToMoneyRatio" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "defaultTaskPoints" INTEGER NOT NULL DEFAULT 10,
    "bonusThreshold" INTEGER NOT NULL DEFAULT 100,
    "bonusAmount" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "penaltyMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletion" ADD CONSTRAINT "TaskCompletion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletion" ADD CONSTRAINT "TaskCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_claimedById_fkey" FOREIGN KEY ("claimedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_appliedToId_fkey" FOREIGN KEY ("appliedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
