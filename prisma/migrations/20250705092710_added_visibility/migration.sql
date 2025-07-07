/*
  Warnings:

  - Added the required column `visibility` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Made the column `thumbUrl` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "visibility" BOOLEAN NOT NULL,
ALTER COLUMN "thumbUrl" SET NOT NULL;
