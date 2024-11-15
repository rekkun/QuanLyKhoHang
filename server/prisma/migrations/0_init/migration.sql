-- CreateTable
CREATE TABLE `Hop` (
    `id_hop` VARCHAR(50) NOT NULL,
    `id_ngan` VARCHAR(50) NULL,
    `moTa` VARCHAR(255) NULL,
    `tenHop` VARCHAR(255) NULL,

    INDEX `FK_HopKe`(`id_ngan`),
    PRIMARY KEY (`id_hop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ke` (
    `id_ke` VARCHAR(50) NOT NULL,
    `moTa` VARCHAR(255) NULL,
    `tenKe` VARCHAR(255) NULL,

    PRIMARY KEY (`id_ke`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Linhkien` (
    `id_linhkien` VARCHAR(50) NOT NULL,
    `ngayDangKi` DATETIME(0) NULL,
    `tenLinhKien` VARCHAR(255) NOT NULL,
    `soLuong` INTEGER NOT NULL DEFAULT 0,

    FULLTEXT INDEX `idx_fts`(`tenLinhKien`),
    PRIMARY KEY (`id_linhkien`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mapping_Linhkien_Hop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_linhkien` VARCHAR(50) NOT NULL,
    `id_hop` VARCHAR(50) NOT NULL,
    `moTa` VARCHAR(255) NOT NULL,
    `soLuong` INTEGER NOT NULL,

    INDEX `FK_Hop`(`id_hop`),
    INDEX `FK_LK`(`id_linhkien`),
    FULLTEXT INDEX `idx_fts`(`moTa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ngan` (
    `id_ngan` VARCHAR(50) NOT NULL,
    `id_ke` VARCHAR(50) NULL,
    `moTa` VARCHAR(255) NULL,
    `tenNgan` VARCHAR(255) NULL,

    INDEX `FK_KeNgan`(`id_ke`),
    PRIMARY KEY (`id_ngan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hop` ADD CONSTRAINT `FK_HopKe` FOREIGN KEY (`id_ngan`) REFERENCES `Ngan`(`id_ngan`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mapping_Linhkien_Hop` ADD CONSTRAINT `FK_Hop` FOREIGN KEY (`id_hop`) REFERENCES `Hop`(`id_hop`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mapping_Linhkien_Hop` ADD CONSTRAINT `FK_LK` FOREIGN KEY (`id_linhkien`) REFERENCES `Linhkien`(`id_linhkien`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ngan` ADD CONSTRAINT `FK_KeNgan` FOREIGN KEY (`id_ke`) REFERENCES `Ke`(`id_ke`) ON DELETE NO ACTION ON UPDATE NO ACTION;

