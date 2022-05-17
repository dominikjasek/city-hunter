/*
  Warnings:

  - The values [USER,ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "UserRole" RENAME VALUE 'USER' TO 'user';
ALTER TYPE "UserRole" RENAME VALUE 'ADMIN' TO 'admin';

