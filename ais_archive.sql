USE id1876583_ais_archive;
-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 05 2017 г., 15:01
-- Версия сервера: 5.7.16
-- Версия PHP: 7.1.0



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ais_archive`
--

-- --------------------------------------------------------

--
-- Структура таблицы `department`
--

CREATE TABLE `department` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `department`
--

INSERT INTO `department` (`id`, `title`) VALUES
(1, 'СИТ'),
(8, 'Отдел кадров'),
(9, 'Отдел поддержки');

-- --------------------------------------------------------

--
-- Структура таблицы `document`
--

CREATE TABLE `document` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datebegin` date DEFAULT NULL,
  `dateend` date DEFAULT NULL,
  `datesignature` date DEFAULT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type_id` int(11) UNSIGNED DEFAULT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL,
  `document_old` tinyint(1) UNSIGNED DEFAULT NULL,
  `old_id` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `document`
--

INSERT INTO `document` (`id`, `title`, `description`, `datebegin`, `dateend`, `datesignature`, `path`, `type_id`, `user_id`, `document_old`, `old_id`) VALUES
(1, 'Макет в фотошоп', 'Макет в фотошоп', '2017-06-03', '2017-06-16', '2017-06-14', 'prosvirkin-maksim-vasil_evich__2041430Макет кубик-рубик Desktop.psd', 1, 1, 1, 4),
(2, 'Макет в фотошоп', 'Макет в фотошоп', '2017-06-03', '2017-06-16', '2017-06-14', 'prosvirkin-maksim-vasil_evich__9863254Макет-кубикИзображение.jpg', 1, 1, 1, 4),
(3, 'Макет в фотошоп', 'Макет в фотошоп', '2017-06-03', '2017-06-16', '2017-06-14', 'prosvirkin-maksim-vasil_evich__6354792Макет-кубик-рубик-Desktop.jpg', 1, 1, 1, 4),
(4, 'Макет в фотошоп', 'Макет в фотошоп', '2017-06-03', '2017-06-16', '2017-06-14', 'prosvirkin-maksim-vasil_evich__5057247Макет кубик-рубик Desktop.psd', 1, 1, 0, 3),
(14, 'Приказ', 'Новый приказ', '2017-06-04', '2017-06-16', '2017-06-08', 'prosvirkin-maksim-vasil_evich__2183749Просвиркин М.В. Отчёт по преддипломной практике.docx', 2, 1, 1, 16),
(15, 'Приказ', 'Новый приказ', '2017-06-04', '2017-06-16', '2017-06-08', 'prosvirkin-maksim-vasil_evich__3870144376201168b8f3c0a65c064ded3879d1b.jpg', 2, 1, 1, 16),
(16, 'Приказ новый', 'Новый приказ', '2017-06-04', '2017-06-16', '2017-06-08', 'prosvirkin-maksim-vasil_evich__2831059maxresdefault1.jpg', 2, 1, 0, 15),
(17, 'Моё фото', 'Моё фото', '2017-06-04', '2017-06-16', '2017-06-22', 'prosvirkin-maksim-vasil_evich__2342949HQEQRpyWCq445.jpg', 0, 1, 1, 18),
(18, 'Моё фото', 'Моё фото', '2017-06-04', '2017-06-16', '2017-06-22', 'prosvirkin-maksim-vasil_evich__5175120maxresdefault.jpg', 0, 1, 0, 17),
(19, 'Моё фото', 'Это моё фото', '2017-06-05', '2017-06-16', '2017-06-02', 'anisimov-evgeniy-andreevich__6594578Stas.jpg', 0, 3, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `documenttype`
--

CREATE TABLE `documenttype` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `documenttype`
--

INSERT INTO `documenttype` (`id`, `title`) VALUES
(1, 'Техника безопасности'),
(2, 'Приказы');

-- --------------------------------------------------------

--
-- Структура таблицы `position`
--

CREATE TABLE `position` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `title` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `position`
--

INSERT INTO `position` (`id`, `title`) VALUES
(1, 'Программист'),
(2, 'Бухгалтер'),
(3, 'Инженер'),
(4, 'Программист-инженер');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middlename` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` int(11) UNSIGNED DEFAULT NULL,
  `position_id` int(11) UNSIGNED DEFAULT NULL,
  `admin` tinyint(1) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `surname`, `name`, `middlename`, `photo`, `email`, `password`, `department_id`, `position_id`, `admin`) VALUES
(1, 'Просвиркин', 'Максим', 'Васильевич', 'img/user_photos/prosvirkin-maksim-vasil_evich__HQEQRpyWCq445.jpg', 'nort359@gmail.com', '$2y$10$m/ecZZsKOFMuoCB/cbbRXe.Yx2pxLBW/8rRUDMvbJ0P/4cFjqpRpC', 1, 1, 1),
(3, 'Анисимов', 'Евгений', 'Андреевич', 'img/user_photos/anisimov-evgeniy-andreevich__Stas.jpg', 'mclaren@gmail.com', '$2y$10$BbgMRHxZWxTP2P6PUf304.K9zqMql3DvubPkabe5hDeAmWbl3gEhm', 1, 3, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_foreignkey_document_type` (`type_id`),
  ADD KEY `index_foreignkey_document_user` (`user_id`),
  ADD KEY `index_foreignkey_document_old` (`old_id`);

--
-- Индексы таблицы `documenttype`
--
ALTER TABLE `documenttype`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_foreignkey_user_department` (`department_id`),
  ADD KEY `index_foreignkey_user_position` (`position_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT для таблицы `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT для таблицы `documenttype`
--
ALTER TABLE `documenttype`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `position`
--
ALTER TABLE `position`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `c_fk_document_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
