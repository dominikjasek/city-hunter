/*
  Warnings:

  - You are about to drop the column `answerPhotoUrl` on the `places` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "places" DROP COLUMN "answerPhotoUrl",
ADD COLUMN     "solutionPhotoUrl" TEXT;
