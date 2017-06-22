<?php
	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/functions/translit.php';

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

			$file_name = $user_name_file . '__' . time() . $_FILES[ 'file' ][ 'name' ];
			$file_name = str2translit( $file_name );

			$final_path = $_SERVER['DOCUMENT_ROOT'] . '/user_files/' . $file_name;


			// Перемещаем файл в созданную папку
			if ( !move_uploaded_file( $_FILES[ 'file' ][ 'tmp_name' ], $final_path ) ) {
				$errors_get_photo[] = 'Вероятно файл содержит недопустимый формат';
			}
		} else {
			$errors_get_photo[] = 'Файл не был загружен';
		}
		

		if ( count($errors_get_photo) === 0 ) {
			$document 					= R::dispense( 'document' );

			$document->title 			= $_POST[ 'title' ];
			$document->description 		= $_POST[ 'description' ];

			$document->datebegin 		= date( 'Y-m-d' );
			$document->dateend 			= $_POST[ 'dateEnd' ];
			$document->datesignature 	= $_POST[ 'dateSignature' ];
			$document->path 			= $file_name;

			$type = empty( $_POST[ 'type' ] ) ? 0 : $_POST[ 'type' ];

			$document->type_id 			= $type;

			$document->users 			= $_POST[ 'user' ] . '||';
			$document->document_old 	= false;
			$document->old_id 			= 0;

			return R::store( $document );
		} else
			return false;
	}

	if ( !empty( $_POST ) ) {
		if ( add_document() )
			echo 'Ok';
		else
			echo array_shift( $errors_sing_up );
	} else
		echo 'Данные не были переданы';

?>