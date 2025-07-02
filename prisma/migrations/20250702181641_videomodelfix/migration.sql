/*
  Warnings:

  - The `videoId` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Video_videoId_key";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "videoId",
ADD COLUMN     "videoId" SERIAL NOT NULL,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("videoId");
