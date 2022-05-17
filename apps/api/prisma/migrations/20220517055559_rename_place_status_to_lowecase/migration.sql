/*
  Warnings:

  - The values [PENDING,ACCEPTED,REJECTED] on the enum `PlaceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "PlaceStatus" RENAME VALUE 'PENDING' TO 'pending';
ALTER TYPE "PlaceStatus" RENAME VALUE 'REJECTED' TO 'rejected';
ALTER TYPE "PlaceStatus" RENAME VALUE 'ACCEPTED' TO 'accepted'
