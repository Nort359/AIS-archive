-- SQL DUMP
-- my_version: 1.00
--
-- База данных: `archive`
--
-- -------------------------
-- -------------------------

USE archive;

-- -------------------------
-- Структура таблицы - `department`
-- -------------------------

DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
-- Структура таблицы - `expansion`
-- -------------------------

DROP TABLE IF EXISTS `expansion`;
CREATE TABLE `expansion` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------
-- Dump DB - tables: `expansion`
-- -------------------------

INSERT INTO `expansion` VALUES("1", "sql"),
("2", "php"),
("3", "txt"),
("4", "docx"),
("5", "rtf");

-- -------------------------
-- Структура таблицы - `documenttype`
-- -------------------------

DROP TABLE IF EXISTS `documenttype`;
CREATE TABLE `documenttype` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `admin` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_user_department` (`department_id`),
  KEY `index_foreignkey_user_position` (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------
-- Dump DB - tables: `user`
-- -------------------------

INSERT INTO `user` VALUES("1", "Просвиркин", "Максим", "Васильевич", "img/user_photos/prosvirkin-maksim-vasil_evich__HQEQRpyWCq445.jpg", "nort359@gmail.com", "$2y$10$qgKtwHBv17k9ljRLIskTYeW3NcJdAU7Z9o0jChukwn9yx3zJL5Chu", "1", "1", "1"),
("3", "Анисимов", "Евгений", "Андреевич", "img/user_photos/anisimov-evgeniy-andreevich__Stas.jpg", "mclaren@gmail.com", "$2y$10$BbgMRHxZWxTP2P6PUf304.K9zqMql3DvubPkabe5hDeAmWbl3gEhm", "1", "3", "2"),
("4", "Александров", "Сергей", NULL, "img/no-profile-photo.jpg", "Alexandrov@gmail.com", "$2y$10$r.rdZZlHKB3Yw1ziz1luaOF55NWdW3UPXn3LGVEBlpFEBCXuZZq6y", "8", "2", "0"),
("5", "Жуков", "Сергей", "Михайлович", "img/no-profile-photo.jpg", "AkS-LH@yandex.ru", "$2y$10$8q9wJUhjPJITJFDNk9prIez9bdQZcTv6ZDkQEZ6f0Mj.uKnVQ8WQi", "9", "3", "0");

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
  `users` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_old` tinyint(1) unsigned DEFAULT NULL,
  `old_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_document_type` (`type_id`),
  KEY `index_foreignkey_document_old` (`old_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------
-- Dump DB - tables: `document`
-- -------------------------

INSERT INTO `document` VALUES("1", "Документ №11-56.7", "Это новый документ: Документ №11-56.7", "2017-06-21", "2017-07-14", "2017-06-21", "prosvirkin-maksim-vasil_evich__149805548519-06-17 prosvirkin m.v. poyasnitel_naya zapiska k diplomnomu proektu1.docx", "0", "1||", "0", "0"),
("2", "Документ №11-56.1", "Это новый документ: Документ №11-56.1", "2017-06-21", "2017-07-14", "2017-06-21", "prosvirkin-maksim-vasil_evich__149805553817-06-17 prosvirkin m.v. poyasnitel_naya zapiska k diplomnomu proektu _ kopiya.docx", "0", "1||", "0", "0"),
("3", "Приказ №18-2", "Мой новый приказ", "2017-06-21", "2017-06-30", "2017-06-15", "prosvirkin-maksim-vasil_evich__149805559017-06-17 prosvirkin m.v. poyasnitel_naya zapiska k diplomnomu proektu.docx", "2", "1||", "0", "0"),
("4", "Отчёт по практике", "Мой отчёт по практике", "2017-06-21", "2017-10-27", "2017-06-15", "prosvirkin-maksim-vasil_evich__149805561617-06-17 prosvirkin m.v. poyasnitel_naya zapiska k diplomnomu proektu.docx", "3", "1||", "0", "0"),
("5", "Приказ-87-17", NULL, "2017-06-21", "2017-09-15", "2017-06-21", "anisimov-evgeniy-andreevich__1498059569prosvirkin m.v. voprosy.rtf", "2", "3||", "0", "0");

-- -------------------------
-- Структура таблицы - `notification`
-- -------------------------

DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_sended` date DEFAULT NULL,
  `readed` int(11) unsigned DEFAULT NULL,
  `user_from_id` int(11) unsigned DEFAULT NULL,
  `user_to_id` int(11) unsigned DEFAULT NULL,
  `document_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_notification_user_from` (`user_from_id`),
  KEY `index_foreignkey_notification_user_to` (`user_to_id`),
  KEY `index_foreignkey_notification_document` (`document_id`),
  CONSTRAINT `c_fk_notification_document_id` FOREIGN KEY (`document_id`) REFERENCES `document` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------
-- Dump DB - tables: `notification`
-- -------------------------

INSERT INTO `notification` VALUES("30", "Анисимов Евгений прислал запрос", "Пользователь Анисимов Евгений Андреевич предложил Вам разделить ответственность за созданный им документ: \"Новый документ\"", "2017-06-20", "1", "3", "1", NULL);
