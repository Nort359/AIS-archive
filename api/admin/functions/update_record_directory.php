<?php

	error_reporting(0);

	/**
	 * Изменяет в переданной таблице запись с одним столбцом title
	 * @param string $table — Название таблицы, в которую нужно изменить запись
	 * @param string $value — Значение изменяемого поля
	 * @param int $id 		— ID изменяемого поля
	 */
	function update_record_directory($table, $value, $id) {
		$position = R::load($table, $id);
		
		$position->title = $value;

		return R::store($position);
	}

	/**
	 * Изменяет в переданной таблице запись с одним столбцом title и возвращает ответ
	 * @param string $table — Название таблицы, в которую нужно изменить запись
	 * @param string $value — Значение изменяемого поля
	 * @param int $id 		— ID изменяемого поля
	 */
	function update_record_and_answer($table, $value, $id) {
		if (!empty($value)) {
			$title = $value;
			$record = update_record_directory($table, $title, $id);

			return $record > 0 ? 'Ok' : 'Error';
		} else
			return 'Данные не были переданы';
	}

?>