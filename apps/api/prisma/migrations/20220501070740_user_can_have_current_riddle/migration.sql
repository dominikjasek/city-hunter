/*
  Warnings:

  - You are about to drop the column `riddleId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_riddleId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "riddleId",
ADD COLUMN     "currentRiddleId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_currentRiddleId_fkey" FOREIGN KEY ("currentRiddleId") REFERENCES "riddles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
