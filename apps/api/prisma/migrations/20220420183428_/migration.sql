/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LoginProvider" AS ENUM ('GOOGLE');

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "thirdPartyId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "provider" "LoginProvider" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
