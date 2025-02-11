/*
  Warnings:

  - You are about to drop the column `dirextX` on the `requirement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `requirement` DROP COLUMN `dirextX`,
    ADD COLUMN `directX` VARCHAR(191) NULL;
