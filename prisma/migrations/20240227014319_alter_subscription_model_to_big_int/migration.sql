/*
  Warnings:

  - You are about to drop the column `expires_at` on the `Subscription` table. All the data in the column will be lost.
  - The `cancel_at` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `canceled_at` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `current_period_end` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `current_period_start` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "expires_at",
DROP COLUMN "cancel_at",
ADD COLUMN     "cancel_at" BIGINT,
DROP COLUMN "canceled_at",
ADD COLUMN     "canceled_at" BIGINT,
DROP COLUMN "current_period_end",
ADD COLUMN     "current_period_end" BIGINT NOT NULL,
DROP COLUMN "current_period_start",
ADD COLUMN     "current_period_start" BIGINT NOT NULL;
