/*
  Warnings:

  - You are about to drop the column `currentRiddleId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_currentRiddleId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "currentRiddleId",
ADD COLUMN     "riddleId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_riddleId_fkey" FOREIGN KEY ("riddleId") REFERENCES "riddles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
