<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/functions/translit.php';

	function update_old_document( $id_old, $new_id ) {
		$document = R::load( 'document', $id_old );

		$document->document_old = true;
		
		$document->old_id = $new_id;

		return R::store( $document );
	}

	function add_document() {
		if ( !empty( $_FILES[ 'file' ][ 'name' ] ) ) {
			$errors_by_send_img = array(
				1 => 'Превышен максимальный размер фала, указанный в php.ini',
				2 => 'Превышен максимальный размер фала, указанный в форме HTML',
				3 => 'Была отправлена только часть файла',
				4 => 'Файл для отправки не был выбран'
			); // массив возможных ошибок при отправки изображения на сервер

			$errors_get_photo = array();

			$user = R::findOne('user', 'id = ?', [ $_POST[ 'user' ] ]);

			// Проверка на отсутсвие ошибки при отправке изображения
			if ( $_FILES[ 'file' ][ 'error' ] !== 0 ) {
				$errors_get_photo[] = $errors_by_send_img[ $_FILES[ 'file' ][ 'error' ] ];
			}

			$user_name_file = str2translit( $user->surname . '-' . $user->name . '-' . $user->middlename );

			$file_name = $user_name_file . '__' . rand(00000, 9999999) . $_FILES[ 'file' ][ 'name' ];

			$final_path = $_SERVER['DOCUMENT_ROOT'] . '/user_files/' . $file_name;


			// Перемещаем файл в созданную папку
			if ( !move_uploaded_file( $_FILES[ 'file' ][ 'tmp_name' ], $final_path ) ) {
				$errors_get_photo[] = 'Вероятно файл содержит недопустимый формат';
			}
		} else {
			$errors_get_photo[] = 'Файл не был загружен';
		}
		

		if ( count($errors_get_photo) === 0 ) {
			$document_old_id = $_POST[ 'oldDocument' ];

			$old_doc = R::findOne( 'document', 'id = ?', [ $document_old_id ] );

			$document 					= R::dispense( 'document' );

			$document->title 			= $old_doc->title;
			$document->description 		= $_POST[ 'description' ];

			$document->datebegin 		= date( 'Y-m-d' );
			$document->dateend 			= $_POST[ 'dateEnd' ];
			$document->datesignature 	= $_POST[ 'dateSignature' ];
			$document->path 			= $file_name;

			$type = empty( $_POST[ 'type' ] ) ? 0 : $_POST[ 'type' ];

			$document->type_id 			= $type;

			$document->user_id 			= $_POST[ 'user' ];

			$document->document_old 				= false;
			$document->old_id 			= $document_old_id;

			return R::store( $document );
		} else
			return false;
	}

	function update_old_id( $id ) {
		$doc = R::findOne( 'document', 'id = ?', [ $id ] );

	    $collection = R::findCollection( 'document', 'old_id = ?', [ $doc->old_id ] );

	    while( $item = $collection->next() ) {
	    	if ( $item->id != $id ) {
	    		$document = R::load( 'document', $item->id );

				if ( $item->old_id !== $id ) {
					$document->old_id = $id;
				}
				
				$document->document_old = true;

				R::store( $document );
			}
	    }

	}

	$new_id = add_document();
	$doc_old_id = $_POST[ 'oldDocument' ];

	update_old_document( $doc_old_id, $new_id );

	if ( !empty( $_POST ) ) {
		if ( $new_id > 0 ) {
			update_old_id( (int)$new_id );

			echo 'Ok';
		}
		else
			echo array_shift( $errors_sing_up );
	} else
		echo 'Данные не были переданы';

?>