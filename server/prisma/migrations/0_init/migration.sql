-- CreateTable
CREATE TABLE `hop` (
    `id_hop` VARCHAR(50) NOT NULL,
    `id_ngan` VARCHAR(50) NOT NULL,
    `id_ke` VARCHAR(50) NOT NULL,
    `moTa` VARCHAR(255) NULL,
    `tenHop` VARCHAR(255) NULL,

    INDEX `FK_HopNganKe`(`id_ngan`, `id_ke`),
    PRIMARY KEY (`id_hop`, `id_ngan`, `id_ke`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ke` (
    `id_ke` VARCHAR(50) NOT NULL,
    `moTa` VARCHAR(255) NULL,
    `tenKe` VARCHAR(255) NULL,

    PRIMARY KEY (`id_ke`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `linhkien` (
    `id_linhkien` VARCHAR(50) NOT NULL,
    `ngayDangKi` DATETIME(0) NULL,
    `tenLinhKien` VARCHAR(255) NOT NULL,
    `soLuong` INTEGER NOT NULL DEFAULT 0,

    FULLTEXT INDEX `idx_fts`(`tenLinhKien`),
    PRIMARY KEY (`id_linhkien`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapping_linhkien_hop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_linhkien` VARCHAR(50) NOT NULL,
    `id_hop` VARCHAR(50) NOT NULL,
    `id_ngan` VARCHAR(50) NOT NULL DEFAULT '',
    `id_ke` VARCHAR(50) NOT NULL,
    `moTa` VARCHAR(255) NOT NULL,
    `soLuong` INTEGER NOT NULL,

    INDEX `FK_Hop`(`id_hop`),
    INDEX `FK_LK`(`id_linhkien`),
    INDEX `FK_Ke`(`id_ke`),
    INDEX `FK_Ngan`(`id_ngan`),
    FULLTEXT INDEX `idx_fts`(`moTa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ngan` (
    `id_ngan` VARCHAR(50) NOT NULL,
    `id_ke` VARCHAR(50) NOT NULL,
    `moTa` VARCHAR(255) NULL,
    `tenNgan` VARCHAR(255) NULL,

    INDEX `FK_KeNgan`(`id_ke`),
    PRIMARY KEY (`id_ngan`, `id_ke`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

