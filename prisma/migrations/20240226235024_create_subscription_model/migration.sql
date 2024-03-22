/*
  Warnings:

  - A unique constraint covering the columns `[subscription_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscription_id" TEXT;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "amount_total" DECIMAL(65,30) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "cancel_at" TIMESTAMP(3),
    "canceled_at" TIMESTAMP(3),
    "current_period_end" TIMESTAMP(3) NOT NULL,
    "current_period_start" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_plan_id_key" ON "Subscription"("plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_customer_id_key" ON "Subscription"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_subscription_id_key" ON "User"("subscription_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
