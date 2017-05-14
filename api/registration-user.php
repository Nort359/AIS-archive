<?php

	require_once 'config.php';

	/**
	 * Регистрация нового пользователя
	 * @return [ void ]
	 */
	function registration_user() {
		$user = R::dispense( 'user' );
		
		$user->surname = $_POST[ 'userLastName' ];
		$user->name = $_POST[ 'userFirstName' ];
		$user->otchestvo = $_POST[ 'userMiddleName' ];
		$user->email = $_POST[ 'userEmail' ];
		$user->password = password_hash( $_POST[ 'userPassword' ], PASSWORD_DEFAULT );

		R::store( $user );
	}

	// Регистрация нового пользователя
	if ( isset( $_POST ) ) {
		$errors_sing_up = array(); // массив возможных ошибок при регистрации

		/* ==== Отлавливание ошибок при регистрации ==== */
		if ( trim( $_POST[ 'userLastName' ] ) === '' ) {
			$errors_sing_up[] = 'Вы не ввели свою фамилию';
		}

		if ( trim( $_POST[ 'userFirstName' ] ) === '' ) {
			$errors_sing_up[] = 'Вы не ввели своё имя';
		}

		if ( trim( $_POST[ 'userMiddleName' ] ) === '' ) {
			$errors_sing_up[] = 'Вы не ввели своё отчество';
		}

		if ( trim( $_POST[ 'userEmail' ] ) === '' ) {
			$errors_sing_up[] = 'Вы не ввели свой Email';
		}

		if ( trim( $_POST[ 'userPassword' ] ) === '' ) {
			$errors_sing_up[] = 'Вы не ввели свой пароль';
		}

		if( mb_strlen( $_POST[ 'userPassword' ], 'utf-8' ) < 6 ) {
			$errors_sing_up[] = 'Введённый вами пароль слишком мал, он должен содержать хотя бы 6 символов';
		}

		// Если такой Email уже существует
		if( R::count( 'user', "email = ?", array( $_POST[ 'userEmail' ] ) ) > 0 ) {
			$errors_sing_up[] = 'Пользователь с таким Email уже зарегистрирован';
		}

		if ( empty( $errors_sing_up ) ) {
			// Регистрируем пользователя
			registration_user();

			$email = $_POST['userEmail'];

			$user = R::findOne('user', 'email = ?', [ $email ]);

			setcookie('user_logged', $user, time() + 3600 * 24 * 31 * 3, '/');  /* срок действия 3 месяца */

			echo $_COOKIE['user_logged'];
		} else {
			// Выводим ошибку
			echo array_shift( $errors_sing_up );
		}
	} else {
		echo 'Произошла ошибка, данные не пришли на сервер';
	}

?>