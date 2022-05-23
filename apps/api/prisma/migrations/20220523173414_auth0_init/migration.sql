/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `photoUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `thirdPartyId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[riddleId]` on the table `solved_riddles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_authorId_fkey";

-- DropForeignKey
ALTER TABLE "solved_riddles" DROP CONSTRAINT "solved_riddles_userId_fkey";

-- AlterTable
ALTER TABLE "places" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "solved_riddles" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "photoUrl",
DROP COLUMN "provider",
DROP COLUMN "refreshToken",
DROP COLUMN "role",
DROP COLUMN "thirdPartyId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- DropEnum
DROP TYPE "UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "solved_riddles_riddleId_key" ON "solved_riddles"("riddleId");

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solved_riddles" ADD CONSTRAINT "solved_riddles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
