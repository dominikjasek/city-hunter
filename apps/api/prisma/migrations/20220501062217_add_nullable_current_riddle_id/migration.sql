/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currentRiddleId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_currentRiddleId_fkey" FOREIGN KEY ("currentRiddleId") REFERENCES "riddles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
