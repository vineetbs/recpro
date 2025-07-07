/*
  Warnings:

  - Added the required column `username` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "userImg" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;
