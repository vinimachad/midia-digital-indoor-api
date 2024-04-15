/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "product_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_product_id_key" ON "Subscription"("product_id");
