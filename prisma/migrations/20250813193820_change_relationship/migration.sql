/*
  Warnings:

  - You are about to drop the column `userId` on the `Events` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Events" DROP CONSTRAINT "Events_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Events" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "public"."EventUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."EventUser" ADD CONSTRAINT "EventUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventUser" ADD CONSTRAINT "EventUser_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
