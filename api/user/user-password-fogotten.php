<?php

	if ( !empty( $_POST[ 'email' ] ) ) {
		$key = rand(00000, 9999999);

		$message = "Ваш персональный код: " . $key . " Введите его в нужное поле.";
		$to = $_POST[ 'email' ];
		$from = 'Nort359@gmail.com';
		$subject = 'Забыли пароль от аккаунта?';
		//$subject = "=?utf-8?B?" . base64_encode( $subject ) . "?=";
		$headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/plain; charset=utf-8\r\n";

		mail($to, $subject, $message, $headers);

		echo json_encode(array( 'key' => $key ));
	} else {
		echo 'Данные не были переданны';
	}

?>