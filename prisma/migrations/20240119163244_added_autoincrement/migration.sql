/*
  Warnings:

  - You are about to drop the column `commercialId` on the `Banner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "commercialId";

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "index" SERIAL NOT NULL;
