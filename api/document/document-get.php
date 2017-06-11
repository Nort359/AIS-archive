<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	
	if ( !empty( $_POST['userId'] ) ) {
		$userId = $_POST['userId'];

		$documents = R::getAll( 'SELECT *
									FROM document
										WHERE users LIKE ?
										ORDER BY title ASC',
	        [ '%' . $userId . '%' ]
	    );

		if ($documents > 0)
			echo json_encode($documents);
		else
			echo 'У пользователя ещё нет документов';
	} else {
		echo 'Данные о пользователе не былы переданы';
	}

?>