<?php

	error_reporting(0);

	/**
	 * Удаляет запись из БД
	 * @param  [ int ] 	$id — ID запись, которую нужно удалить
	 * @param  [ string ] $table  — Название таблица, из которой нужно удалить
	 * @return [ bool ] TRUE, если удалось удалить запись из БД, FALSE, если нет
	 */
	function delete_current_record( $table, $id ) {
		if ( !$id ) {
			return false;
		}

		$record = R::load( $table, $id );

		R::trash( $record );

		return true;
	}

?>