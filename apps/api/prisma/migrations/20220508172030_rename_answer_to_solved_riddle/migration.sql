/*
  Warnings:

  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_riddleId_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_userId_fkey";

-- DropTable
DROP TABLE "answers";

-- CreateTable
CREATE TABLE "solved_riddles" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "riddleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "solved_riddles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "solved_riddles" ADD CONSTRAINT "solved_riddles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solved_riddles" ADD CONSTRAINT "solved_riddles_riddleId_fkey" FOREIGN KEY ("riddleId") REFERENCES "riddles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
