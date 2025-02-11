-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `price` DOUBLE NOT NULL,
    `discountPrice` DOUBLE NOT NULL,
    `discountPercent` INTEGER NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `developer` VARCHAR(191) NOT NULL,
    `physical` BOOLEAN NOT NULL,

    UNIQUE INDEX `Game_gameId_key`(`gameId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `os` VARCHAR(191) NULL,
    `processor` VARCHAR(191) NULL,
    `memory` VARCHAR(191) NULL,
    `graphics` VARCHAR(191) NULL,
    `dirextX` VARCHAR(191) NULL,
    `network` VARCHAR(191) NULL,
    `storage` VARCHAR(191) NULL,

    UNIQUE INDEX `Requirement_gameId_key`(`gameId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Screenshot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Screenshot` ADD CONSTRAINT `Screenshot_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
