/*
  Warnings:

  - You are about to drop the column `city` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `condition_code` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `currently` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `img_id` on the `Weather` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Weather" DROP COLUMN "city",
DROP COLUMN "condition_code",
DROP COLUMN "currently",
DROP COLUMN "date",
DROP COLUMN "img_id",
ALTER COLUMN "temp" SET DATA TYPE TEXT;
