-- CreateEnum
CREATE TYPE "CommercialStatus" AS ENUM ('PENDING_ANALYSIS', 'ACTIVE');

-- CreateTable
CREATE TABLE "Commercial" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" "CommercialStatus" NOT NULL DEFAULT 'PENDING_ANALYSIS',
    "description" TEXT NOT NULL,
    "url" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commercial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commercial" ADD CONSTRAINT "Commercial_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
