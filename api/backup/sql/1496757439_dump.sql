-- SQL DUMP
-- my_version: 1.00
--
-- База данных: `ais_archive`
--
-- -------------------------
-- -------------------------

USE ais_archive;

-- -------------------------
-- Структура таблицы - `department`
-- -------------------------

DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------
-- Dump DB - tables: `department`
-- -------------------------

INSERT INTO `department` VALUES("1", "СИТ"),
("8", "Отдел кадров"),
("9", "Отдел поддержки");

-- -------------------------
-- Структура таблицы - `position`
-- -------------------------

DROP TABLE IF EXISTS `position`;
CREATE TABLE `position` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- -------------------------
-- Dump DB - tables: `position`
-- -------------------------

INSERT INTO `position` VALUES("1", "Программист"),
("2", "Бухгалтер"),
("3", "Инженер"),
("4", "Программист-инженер");

-- -------------------------
-- Структура таблицы - `documenttype`
-- -------------------------

DROP TABLE IF EXISTS `documenttype`;
CREATE TABLE `documenttype` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------
-- Dump DB - tables: `documenttype`
-- -------------------------

INSERT INTO `documenttype` VALUES("1", "Техника безопасности"),
("2", "Приказы"),
("3", "Отчеты");

-- -------------------------
-- Структура таблицы - `user`
-- -------------------------

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middlename` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` int(11) unsigned DEFAULT NULL,
  `position_id` int(11) unsigned DEFAULT NULL,
  `admin` tinyint(1) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_user_department` (`department_id`),
  KEY `index_foreignkey_user_position` (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------
-- Dump DB - tables: `user`
-- -------------------------

INSERT INTO `user` VALUES("1", "Просвиркин", "Максим", "Васильевич", "img/user_photos/prosvirkin-maksim-vasil_evich__Egor.jpg", "nort359@gmail.com", "$2y$10$m/ecZZsKOFMuoCB/cbbRXe.Yx2pxLBW/8rRUDMvbJ0P/4cFjqpRpC", "1", "1", "1"),
("3", "Анисимов", "Евгений", "Андреевич", "img/user_photos/anisimov-evgeniy-andreevich__Stas.jpg", "mclaren@gmail.com", "$2y$10$BbgMRHxZWxTP2P6PUf304.K9zqMql3DvubPkabe5hDeAmWbl3gEhm", "1", "3", "0");

-- -------------------------
-- Структура таблицы - `document`
-- -------------------------

DROP TABLE IF EXISTS `document`;
CREATE TABLE `document` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datebegin` date DEFAULT NULL,
  `dateend` date DEFAULT NULL,
  `datesignature` date DEFAULT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `document_old` tinyint(1) unsigned DEFAULT NULL,
  `old_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_document_type` (`type_id`),
  KEY `index_foreignkey_document_user` (`user_id`),
  KEY `index_foreignkey_document_old` (`old_id`),
  CONSTRAINT `c_fk_document_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------
-- Dump DB - tables: `document`
-- -------------------------

INSERT INTO `document` VALUES("1", "Макет в фотошоп", "Макет в фотошоп", "2017-06-03", "2017-06-16", "2017-06-14", "prosvirkin-maksim-vasil_evich__2041430Макет кубик-рубик Desktop.psd", "1", "1", "1", "4"),
("2", "Макет в фотошоп", "Макет в фотошоп", "2017-06-03", "2017-06-16", "2017-06-14", "prosvirkin-maksim-vasil_evich__9863254Макет-кубикИзображение.jpg", "1", "1", "1", "4"),
("3", "Макет в фотошоп", "Макет в фотошоп", "2017-06-03", "2017-06-16", "2017-06-14", "prosvirkin-maksim-vasil_evich__6354792Макет-кубик-рубик-Desktop.jpg", "1", "1", "1", "4"),
("4", "Макет в фотошоп", "Макет в фотошоп", "2017-06-03", "2017-06-16", "2017-06-14", "prosvirkin-maksim-vasil_evich__5057247Макет кубик-рубик Desktop.psd", "1", "1", "0", "3"),
("14", "Приказ", "Новый приказ", "2017-06-04", "2017-06-16", "2017-06-08", "prosvirkin-maksim-vasil_evich__2183749Просвиркин М.В. Отчёт по преддипломной практике.docx", "2", "1", "1", "16"),
("15", "Приказ", "Новый приказ", "2017-06-04", "2017-06-16", "2017-06-08", "prosvirkin-maksim-vasil_evich__3870144376201168b8f3c0a65c064ded3879d1b.jpg", "2", "1", "1", "16"),
("16", "Приказ новый", "Новый приказ", "2017-06-04", "2017-06-16", "2017-06-08", "prosvirkin-maksim-vasil_evich__2831059maxresdefault1.jpg", "2", "1", "0", "15"),
("17", "Моё фото", "Моё фото", "2017-06-04", "2017-06-16", "2017-06-22", "prosvirkin-maksim-vasil_evich__2342949HQEQRpyWCq445.jpg", "0", "1", "1", "18"),
("18", "Моё фото", "Моё фото", "2017-06-04", "2017-06-16", "2017-06-22", "prosvirkin-maksim-vasil_evich__5175120maxresdefault.jpg", "0", "1", "0", "17"),
("19", "Моё фото", "Это моё фото", "2017-06-05", "2017-06-16", "2017-06-02", "anisimov-evgeniy-andreevich__6594578Stas.jpg", "0", "3", "0", "0");
