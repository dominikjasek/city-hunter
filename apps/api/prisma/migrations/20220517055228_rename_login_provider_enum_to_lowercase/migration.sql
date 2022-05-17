/*
  Warnings:

  - The values [GOOGLE] on the enum `LoginProvider` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "LoginProvider" RENAME VALUE 'GOOGLE' TO 'google'
