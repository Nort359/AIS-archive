<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$email = $_POST['userEmail'];
	$password = $_POST[ 'userPassword' ];

	$user = R::findOne( 'user', 'email = ?', [ $email ] );

	if ($user > 0) {
		if (password_verify($password, $user->password)) {
			$user_department = R::findOne( 'department', 'id = ?', [ $user->department_id ] );
			$user_position   = R::findOne( 'position', 'id = ?', [ $user->position_id ] );

			$user_with_depart = array(
				'id' 			=> $user->id,
				'name' 			=> $user->name,
				'surname' 		=> $user->surname,
				'middlename' 	=> $user->middlename,
				'photo' 		=> $user->photo,
				'email' 		=> $user->email,
				'password' 		=> $user->password,
				'department_id' => $user->department_id,
				'position_id' 	=> $user->position_id,
				'admin' 		=> $user->admin,
				'department' 	=> $user_department->title,
				'position'   	=> $user_position->title
			);


			setcookie('user_logged', serialize($user_with_depart), time() + 3600 * 24 * 31 * 3, '/'); // срок действия 3 месяца

			echo json_encode($user_with_depart);
		} else {
			echo 'Неверный пароль';
		}
		
	} else {
		echo 'Такого пользователя не существует';
	}

?>