/*
  Warnings:

  - You are about to drop the `Commercial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Banner" DROP CONSTRAINT "Banner_commercialId_fkey";

-- DropForeignKey
ALTER TABLE "Commercial" DROP CONSTRAINT "Commercial_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Commercial" DROP CONSTRAINT "Commercial_weatherId_fkey";

-- DropTable
DROP TABLE "Commercial";
