<?php

	error_reporting(0);

	/**
	 * Проверяет в переданной таблице запись со столбцом, значение которого = $value
	 * @param string $table — Название таблицы, в которую нужно проверять запись
	 * @param string $value — Значение для проверки
	 */
	function check_record_directody($table, $value) {
		if (!empty($value)) {
			$title = $value;

			$record = R::findOne($table, 'title = ?', [ $title ]);

			if ($record > 0)
				return 'Error';
			else
				return 'Ok';
		} else
			return 'Данные не были переданы';
	}

?>