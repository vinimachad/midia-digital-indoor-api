/*
  Warnings:

  - The primary key for the `Forecast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `index` to the `Forecast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Forecast" DROP CONSTRAINT "Forecast_pkey",
ADD COLUMN     "index" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id");
