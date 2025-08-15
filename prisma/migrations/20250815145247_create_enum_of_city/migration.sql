/*
  Warnings:

  - You are about to drop the column `cep` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - The `city` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `number` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."enumCity" AS ENUM ('CRICIUMA', 'TUBARAO');

-- AlterTable
ALTER TABLE "public"."Address" DROP COLUMN "cep",
DROP COLUMN "state",
ALTER COLUMN "number" SET NOT NULL,
DROP COLUMN "city",
ADD COLUMN     "city" "public"."enumCity" DEFAULT 'CRICIUMA';
