<?php

	error_reporting(-1);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/delete_record_directory.php';

	$document_type_id = $_POST['typeDocumentId'];

	if ( R::findOne( 'document', 'type_id = ?', [ $document_type_id ] ) > 0 ) {
		echo 'Вы не можете удалить этот тип документа, так как к нему пользователи уже добавили свои документы';
	} else {
		if ( delete_current_record( 'documenttype', $document_type_id ) )
			echo 'Ok';
		else
			echo 'Error';
	}

?>