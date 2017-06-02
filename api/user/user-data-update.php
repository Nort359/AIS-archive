<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/functions/translit.php';

	function password_update( $table, $value ) {
		if ( !empty( $_FILES[ 'photo' ][ 'name' ] ) ) {
			$errors_by_send_img = array(
				1 => 'Превышен максимальный размер фала, указанный в php.ini',
				2 => 'Превышен максимальный размер фала, указанный в форме HTML',
				3 => 'Была отправлена только часть файла',
				4 => 'Файл для отправки не был выбран'
			); // массив возможных ошибок при отправки изображения на сервер

			$errors_get_photo = array();

			// Если изображение было загружено
			if ( !empty( $_FILES[ 'photo' ][ 'name' ] ) ) {
				// Проверка на отсутсвие ошибки при отправке изображения
				if ( $_FILES[ 'photo' ][ 'error' ] !== 0 ) {
					$errors_get_photo[] = $errors_by_send_img[ $_FILES[ 'photo' ][ 'error' ] ];
				}

				$ext_type = array( 'jpg','jpe','jpeg','png' );

				// Проверка файла на то, является ли он изображением
				if ( !$_FILES[ 'photo' ][ 'type' ] === 'image/jpeg'
				  OR !$_FILES[ 'photo' ][ 'type' ] === 'image/jpg'
				  OR !$_FILES[ 'photo' ][ 'type' ] === 'image/png' ) {
					$errors_get_photo[] = 'Загруженный файл не является изображением. Пожалуйста, вставьте изображение только с одним следующих расширений: [ ".jpeg", ".jpg", ".png" ]';
				}
			}

			$user_name_photo = str2translit( $_POST[ 'userLastName' ] . '-' . $_POST[ 'userFirstName' ] . '-' . $_POST[ 'userMiddleName' ] );

			$file_name = 'img/user_photos/' . $user_name_photo . '__' . $_FILES[ 'photo' ][ 'name' ];

			$final_path = $_SERVER['DOCUMENT_ROOT'] . '/public/' . $file_name;


			// Перемещаем изображение в созданную папку с компитенцией
			if ( !move_uploaded_file( $_FILES[ 'photo' ][ 'tmp_name' ], $final_path ) ) {
				$errors_get_photo[] = 'Неудалось переместить Ваше изображение в папку, вероятно изображение содержит недопустимый формат';
			}
		}
		

		if ( count($errors_get_photo) === 0 ) {
			$user = R::load( $table, $_POST[ 'userId' ] );

			$user->surname = $_POST[ 'userLastName' ];
			$user->name = $_POST[ 'userFirstName' ];
			$user->middlename = $_POST[ 'userMiddleName' ];
			$user->department_id = $_POST[ 'userDepartment' ];
			$user->position_id = $_POST[ 'userPosition' ];

			if ( !empty( $_FILES[ 'photo' ][ 'name' ] ) ) {
				$user->photo = $file_name;
			}

			return R::store( $user );
		} else
			return false;
	}

	if ( !empty( $_POST ) ) {
		if ( password_update( 'user', $password ) )
			echo 'Ok';
		else
			echo 'Error';
	} else
		echo 'Данные не были переданы';

?>