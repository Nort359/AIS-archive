<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/functions/translit.php';

	function update_document() {
		$old_document 				= $_POST[ 'oldDocument' ];

		$doc 						= R::findOne( 'document', 'id = ?', [ $old_document ] );

		$document 					= R::load( 'document', $old_document );

		$document->title 			= $_POST[ 'title' ];
		$document->description 		= $_POST[ 'description' ];

		$document->datebegin 		= date( 'Y-m-d' );
		$document->dateend 			= $_POST[ 'dateEnd' ];
		$document->datesignature 	= $_POST[ 'dateSignature' ];
		$document->users 			= $doc->users;

		$type = empty( $_POST[ 'type' ] ) ? 0 : $_POST[ 'type' ];

		$document->type_id 			= $type;

		return R::store( $document );
	}

	if ( !empty( $_POST ) ) {
		if ( update_document() )
			echo 'Ok';
		else
			echo 'Error';
	} else
		echo 'Данные не были переданы';

?>