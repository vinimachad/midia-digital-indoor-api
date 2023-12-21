-- CreateTable
CREATE TABLE "Commercial" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "time_seconds" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commercial_pkey" PRIMARY KEY ("id")
);
