/*
  Warnings:

  - You are about to drop the column `created_at` on the `Commercial` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Commercial" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "News" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
