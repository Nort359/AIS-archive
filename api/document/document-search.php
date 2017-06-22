<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	
	if ( !empty( $_POST ) ) {
		$id 				= $_POST['userId'];
		$search 			= $_POST['search'];

		$dateBeginFrom 		= $_POST['dateBeginFrom'];
        $dateBeginTo 		= $_POST['dateBeginTo'];
        $dateSignatureFrom 	= $_POST['dateSignatureFrom'];
        $dateSignatureTo 	= $_POST['dateSignatureTo'];
        $dateEndFrom 		= $_POST['dateEndFrom'];
        $dateEndTo 			= $_POST['dateEndTo'];

        $oderAlphabet 		= $_POST[ 'oderAlphabet' ];
        $derDateBegin 		= $_POST[ 'oderDateBegin' ];
        $oderDateSignature 	= $_POST[ 'oderDateSignature' ];
        $oderDateEnd 		= $_POST[ 'oderDateEnd' ];

        $findString = '';
        $findArray = array();

		$findString .= '`users` LIKE ?';

		$findArray[] = '%' . $id . '%';

		if ( !empty( $search ) ) {
			$findString .= ' AND (`title` LIKE ?';
			$findArray[] = '%' . $search . '%';

			$findString .= ' OR `description` LIKE ?)';
			$findArray[] = '%' . $search . '%';
		}

		if ( !empty( $dateBeginFrom ) ) {
			$findString .= ' AND `datebegin` >= ?';
			$findArray[] = $dateBeginFrom;
		}

		if ( !empty( $dateBeginTo ) ) {
			$findString .= ' AND `datebegin` <= ?';
			$findArray[] = $dateBeginTo;
		}

		if ( !empty( $dateSignatureFrom ) ) {
			$findString .= ' AND `datesignature` >= ?';
			$findArray[] = $dateSignatureFrom;
		}

		if ( !empty( $dateSignatureTo ) ) {
			$findString .= ' AND `datesignature` <= ?';
			$findArray[] = $dateSignatureTo;
		}

		if ( !empty( $dateEndFrom ) ) {
			$findString .= ' AND `dateend` >= ?';
			$findArray[] = $dateEndFrom;
		}

		if ( !empty( $dateEndTo ) ) {
			$findString .= ' AND `dateend` <= ?';
			$findArray[] = $dateEndTo;
		}

		$documents = R::findCollection( 'document', $findString, $findArray );

		$docs = array();

		while( $item = $documents->next() ) {
			$creater = substr( $item->users, 0, 1 );
			$users_count = explode( '||', $item->users );

	    	$user = R::findOne( 'user', 'id = ?', [ $creater ] );
	    	
			$docs[] = array(
				'id' 					=> $item->id,
	            'title' 				=> $item->title,
	            'description' 			=> $item->description,
	            'datebegin' 			=> $item->datebegin,
	            'dateend' 				=> $item->dateend,
	            'datesignature' 		=> $item->datesignature,
	            'path' 					=> $item->path,
	            'type_id' 				=> $item->type_id,
	            'users' 				=> $item->users,
	            'document_old' 			=> $item->document_old,
	            'old_id' 				=> $item->old_id,
	            'creater_id' 			=> $user->id,
	            'creater_name' 			=> $user->name,
	            'creater_surname' 		=> $user->surname,
	            'creater_middlename' 	=> $user->middlename,
	            'users_count' 			=> count( $users_count ) - 1

			);
	    }

		if ( count( $docs ) > 0 )
			echo json_encode($docs);
		else
			echo 'Документы по такому запросу не найдены';
	} else {
		echo 'Данные о поиске не былы переданы';
	}

?>