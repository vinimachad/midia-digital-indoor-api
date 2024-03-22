-- DropForeignKey
ALTER TABLE "Commercial" DROP CONSTRAINT "Commercial_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Commercial" DROP CONSTRAINT "Commercial_weatherId_fkey";

-- AlterTable
ALTER TABLE "Commercial" ALTER COLUMN "newsId" DROP NOT NULL,
ALTER COLUMN "weatherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Commercial" ADD CONSTRAINT "Commercial_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commercial" ADD CONSTRAINT "Commercial_weatherId_fkey" FOREIGN KEY ("weatherId") REFERENCES "Weather"("id") ON DELETE SET NULL ON UPDATE CASCADE;
