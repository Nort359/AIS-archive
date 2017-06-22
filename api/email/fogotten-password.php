<?php

	$message = 'Просто сообщение';
	$to = 'Nort359@gmail.com';
	$from = 'Nort359@mail.ru';
	$subject = 'Тема сообщения';
	$subject = "=?utf-8?B?" . base64_encode( $subject ) . "?=";

	$headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/plain; charset=utf-8\r\n";

	if ( mail( $to, $subject, $message, $headers ) ) {
		echo "Успех";
	} else {
		echo "Ошибка";
	}


?>