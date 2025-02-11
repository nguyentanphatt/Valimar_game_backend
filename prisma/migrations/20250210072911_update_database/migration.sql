-- DropForeignKey
ALTER TABLE `requirement` DROP FOREIGN KEY `Requirement_gameId_fkey`;

-- DropIndex
DROP INDEX `Requirement_gameId_key` ON `requirement`;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
