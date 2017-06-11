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

		$findString 		= 'SELECT *
								FROM document
									WHERE users LIKE ?';

		$findArray = array( '%' . $id . '%' );

		if ( !empty( $search ) ) {
			$findString .= ' AND title LIKE ?';
			$findArray[] = '%' . $search . '%';
		}

		if ( !empty( $dateBeginFrom ) ) {
			$findString .= ' AND datebegin > ?';
			$findArray[] = $dateBeginFrom;
		}

		if ( !empty( $dateBeginTo ) ) {
			$findString .= ' AND datebegin < ?';
			$findArray[] = $dateBeginTo;
		}

		if ( !empty( $dateSignatureFrom ) ) {
			$findString .= ' AND dateend > ?';
			$findArray[] = $dateSignatureFrom;
		}

		if ( !empty( $dateSignatureTo ) ) {
			$findString .= ' AND dateend < ?';
			$findArray[] = $dateSignatureTo;
		}

		if ( !empty( $dateEndFrom ) ) {
			$findString .= ' AND datesignature > ?';
			$findArray[] = $dateEndFrom;
		}

		if ( !empty( $dateEndTo ) ) {
			$findString .= ' AND datesignature < ?';
			$findArray[] = $dateEndTo;
		}

		$orderString = ' ORDER BY title ASC';

		if ( $oderAlphabet === true ) {
			$orderString = ' ORDER BY title DESC';
		}

		$findString .= $orderString;

		$documents = R::getAll( $findString, $findArray );

		if ($documents > 0)
			echo json_encode($documents);
		else
			echo 'Документы по такому запросу не найдены';
	} else {
		echo 'Данные о поиске не былы переданы';
	}

?>