-- AlterTable
ALTER TABLE "Commercial" ADD COLUMN     "how_buy_url" TEXT;

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "commercialId" TEXT,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_commercialId_fkey" FOREIGN KEY ("commercialId") REFERENCES "Commercial"("id") ON DELETE SET NULL ON UPDATE CASCADE;
