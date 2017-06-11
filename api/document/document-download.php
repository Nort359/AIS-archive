<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$document_id = $_GET[ 'id' ];

	$document = R::findOne( 'document', 'id = ?', [ $document_id ] );

	/**
	 * Отдаёт файл на закачку пользователю
	 * @param  [ string ] $file — Путь к нужному файлу
	 * @return [ void ]
	 */
	function file_force_download( $file ) {
	  if ( file_exists( $file ) ) {
	    // сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
	    // если этого не сделать файл будет читаться в память полностью!

	    if ( ob_get_level() ) {
	    	ob_end_clean();
	    }

	    // заставляем браузер показать окно сохранения файла
	    header( 'Content-Description: File Transfer' );
	    header( 'Content-Type: application/octet-stream' );
	    header( 'Content-Disposition: attachment; filename=' . basename( $file ) );
	    header( 'Content-Transfer-Encoding: binary' );
	    header( 'Expires: 0');
	    header( 'Cache-Control: must-revalidate' );
	    header( 'Pragma: public' );
	    header( 'Content-Length: ' . filesize( $file ) );

	    // читаем файл и отправляем его пользователю
	    readfile( $file );

	    die;
	  }
	}

	if ( !empty( $_GET ) ) {
		file_force_download( $_SERVER['DOCUMENT_ROOT'] . '/user_files/' . $document->path );
		echo "Ok";
	} else {
		echo "Error";
	}

?>