-- CreateEnum
CREATE TYPE "LoginProvider" AS ENUM ('GOOGLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "thirdPartyId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "provider" "LoginProvider" NOT NULL,
    "refreshToken" TEXT NOT NULL DEFAULT E'default-value-by-prisma',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
