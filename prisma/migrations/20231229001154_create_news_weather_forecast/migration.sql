/*
  Warnings:

  - You are about to drop the column `time_seconds` on the `Commercial` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Commercial` table. All the data in the column will be lost.
  - Added the required column `newsId` to the `Commercial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weatherId` to the `Commercial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commercial" DROP COLUMN "time_seconds",
DROP COLUMN "url",
ADD COLUMN     "newsId" TEXT NOT NULL,
ADD COLUMN     "weatherId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "qrcode" TEXT NOT NULL,
    "delay" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" TEXT NOT NULL,
    "temp" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "condition_code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currently" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "img_id" TEXT NOT NULL,
    "sunrise" TEXT NOT NULL,
    "sunset" TEXT NOT NULL,
    "condition_slug" TEXT NOT NULL,
    "city_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forecast" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "weekday" TEXT NOT NULL,
    "max" INTEGER NOT NULL,
    "min" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weatherId" TEXT,

    CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commercial" ADD CONSTRAINT "Commercial_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commercial" ADD CONSTRAINT "Commercial_weatherId_fkey" FOREIGN KEY ("weatherId") REFERENCES "Weather"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forecast" ADD CONSTRAINT "Forecast_weatherId_fkey" FOREIGN KEY ("weatherId") REFERENCES "Weather"("id") ON DELETE SET NULL ON UPDATE CASCADE;
