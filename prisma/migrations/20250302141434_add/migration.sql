-- CreateTable
CREATE TABLE `Promocode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `promocode` VARCHAR(191) NOT NULL,
    `percent` DOUBLE NOT NULL,
    `validDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
