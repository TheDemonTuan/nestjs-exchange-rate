-- CreateTable
CREATE TABLE `exchange_rate_api` (
    `id` VARCHAR(191) NOT NULL,
    `currency_name` VARCHAR(191) NOT NULL,
    `buy_rate` VARCHAR(191) NOT NULL,
    `transfer_rate` VARCHAR(191) NOT NULL,
    `sell_rate` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exchange_rate_api_time` (
    `id` INTEGER NOT NULL,
    `api_update_at` VARCHAR(191) NOT NULL,
    `server_update_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exchange_rate_raw` (
    `id` VARCHAR(191) NOT NULL,
    `currency_name` VARCHAR(191) NOT NULL,
    `buy_rate` VARCHAR(191) NOT NULL,
    `transfer_rate` VARCHAR(191) NOT NULL,
    `sell_rate` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exchange_rate_raw_time` (
    `id` INTEGER NOT NULL,
    `api_update_at` VARCHAR(191) NOT NULL,
    `server_update_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
