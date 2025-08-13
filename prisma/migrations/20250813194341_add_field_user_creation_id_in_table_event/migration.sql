/*
  Warnings:

  - Added the required column `userCreationId` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `Events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Events" ADD COLUMN     "userCreationId" TEXT NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
