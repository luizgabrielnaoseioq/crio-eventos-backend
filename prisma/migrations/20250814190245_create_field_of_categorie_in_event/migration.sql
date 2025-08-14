-- CreateEnum
CREATE TYPE "public"."Categories" AS ENUM ('SHOW', 'WORKSHOP', 'GASTRONOMY', 'SEMINAR', 'NETWORk', 'SPORT');

-- AlterTable
ALTER TABLE "public"."Events" ADD COLUMN     "categorie" "public"."Categories" DEFAULT 'SHOW';
