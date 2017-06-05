<?php

	error_reporting(0);

	/**
	 * Добавляет в переданную таблицу запись с одним столбцом title
	 * @param string $table — Название таблицы, в которую нужно добавить запись
	 * @param string $value — Значение добаляемого поля
	 */
	function add_record_directory($table, $value) {
		$position = R::dispense($table);
		
		$position->title = $value;

		return R::store($position);
	}

	/**
	 * Добавляет в переданную таблицу запись с одним столбцом title и возвращает ответ
	 * @param string $table — Название таблицы, в которую нужно добавить запись
	 * @param string $value — Значение добаляемого поля
	 */
	function add_record_and_answer($table, $value) {
		if (!empty($value)) {
			$title = $value;
			$record = add_record_directory($table, $title);

			return $record > 0 ? 'Ok' : 'Error';
		} else
			return 'Данные не были переданы';
	}

?>