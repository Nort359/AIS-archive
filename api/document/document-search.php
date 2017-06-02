<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	
	if ( !empty( $_POST ) ) {
		$search = $_POST['search'];
		$id = $_POST['userId'];

		$documents = R::findAll( 'document', 'user_id = ? AND title LIKE ?', [ $id, '%' . $search . '%' ] );

		if ($documents > 0)
			echo json_encode($documents);
		else
			echo 'Документы по такому запросу не найдены';
	} else {
		echo 'Данные о поиске не былы переданы';
	}

?>