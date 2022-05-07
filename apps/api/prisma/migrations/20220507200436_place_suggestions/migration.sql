/*
  Warnings:

  - You are about to drop the column `riddlePhotUrl` on the `places` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `places` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riddlePhotoUrl` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlaceStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "places" DROP COLUMN "riddlePhotUrl",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "riddlePhotoUrl" TEXT NOT NULL,
ADD COLUMN     "status" "PlaceStatus" NOT NULL DEFAULT E'PENDING',
ALTER COLUMN "answerPhotoUrl" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
