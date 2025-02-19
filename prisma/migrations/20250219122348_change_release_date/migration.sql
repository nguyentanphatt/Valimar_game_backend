/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `game` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `game` MODIFY `releaseDate` DATETIME(3) NOT NULL;
