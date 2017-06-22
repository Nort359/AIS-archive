<?php
	//подключаем конфигурационный файл для русского языка
	require_once('tcpdf/config/lang/rus.php');
	//подключаем библиотеку tcpdf
	require_once('tcpdf/tcpdf.php');

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	////////////////////////////////

	//Создаем объект класса TCPDF
	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 
						PDF_PAGE_FORMAT, true, 'UTF-8');

	//Информация о документе
	$pdf->SetCreator(PDF_CREATOR);
	$pdf->SetAuthor('Prosvirkin Maxim');
	$pdf->SetTitle('Отчёт по документам');
	$pdf->SetSubject('Документы');
	$pdf->SetKeywords('Документы');

	//Шапка документа
	$pdf->SetHeaderData(PDF_HEADER_LOGO,PDF_HEADER_LOGO_WIDTH,
						PDF_HEADER_TITLE.' - Отчёты по документам', 
						PDF_HEADER_STRING);

	//Шрифт шапки и футера документа
	$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
	$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

	//Отступы
	$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
	$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
	$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

	//Подгружаем языковые настройки
	$pdf->setLanguageArray($l);
	//////////////////////////////////////////////////////
	//Устанавливаем шрифт документа
	$pdf->SetFont('freeserif', '', 14);

	/////четвертая страница
	//Добавляем страницу
	$pdf->AddPage();

	$documents = explode( '||', $_GET[ 'docs' ] );

	$documents_ids = explode( '||', $_GET[ 'docs' ] );

	$documents = R::findCollection( 'document', 'id IN (' . R::genSlots( $documents_ids ) . ')', $documents_ids );

	$columns = '';

	$monthes = array(
	    1 => 'Января', 2 => 'Февраля', 3 => 'Марта', 4 => 'Апреля',
	    5 => 'Мая', 6 => 'Июня', 7 => 'Июля', 8 => 'Августа',
	    9 => 'Сентября', 10 => 'Октября', 11 => 'Ноября', 12 => 'Декабря'
	);

	while( $item = $documents->next() ) {
		$user = R::findOne( 'user', 'id = ?', [ substr( $item->users, 0, 1) ] );

		$dateBegin = date( 'j', strtotime( $item->datebegin ) ) . ' ' . $monthes[ date( 'n', strtotime( $item->datebegin ) ) ] . ' ' . date( 'Y', strtotime( $item->datebegin ) ) . 'г.';

		$dateSignature = date( 'j', strtotime( $item->datesignature ) ) . ' ' . $monthes[ date( 'n', strtotime( $item->datesignature ) ) ] . ' ' . date( 'Y', strtotime( $item->datesignature ) ) . 'г.';

		$dateEnd = date( 'j', strtotime( $item->dateend ) ) . ' ' . $monthes[ date( 'n', strtotime( $item->dateend ) ) ] . ' ' . date( 'Y', strtotime( $item->dateend ) ) . 'г.';

		$columns .= '
					<tr>
						<td>' . $item->title . '</td>
						<td>' . $item->description . '</td>
						<td>' . $user->surname . ' ' . $user->name . ' ' . $user->middlename . ' ' . '</td>
						<td>' . $dateBegin . '</td>
						<td>' . $dateSignature . '</td>
						<td>' . $dateEnd . '</td>
					</tr>
					';
	}


	$html = '<h1 style="text-align: center;">Таблица моих актуальных документов</h1>
	<table border="1px" cellspacing="3" cellpadding="4" style="text-align: center;">
	<tr>
		<td><b>Название документа</b></td>
		<td><b>Описание документа</b></td>
		<td><b>Кто добавил</b></td>
		<td><b>Дата добавления</b></td>
		<td><b>Дата подписания</b></td>
		<td><b>Дата пересмотра</b></td>
	</tr>' . $columns . '
	</table>
	<br/>
	';

	// Выводим данные используя HTML теги
	$pdf->writeHTML($html);

	$user_ids = explode( '--', $_GET[ 'user' ] );

	$users = R::findCollection( 'user', 'id IN (' . R::genSlots( $user_ids ) . ')', $user_ids );
	$docs_pack = explode( '---', $_GET[ 'userDocs' ] );

	$i = 0;

	while ( $user = $users->next() ) {
		$columns = '';

		$docs_ids = explode( '__', $docs_pack[ $i ] );

		$docs = R::findCollection( 'document', 'id IN (' . R::genSlots( $docs_ids ) . ')', $docs_ids );

		while ( $d = $docs->next() ) {
			$docUser = R::findOne( 'user', 'id IN (' . R::genSlots( $user_ids ) . ')', $user_ids );

			$dateBegin = date( 'j', strtotime( $d->datebegin ) ) . ' ' . $monthes[ date( 'n', strtotime( $d->datebegin ) ) ] . ' ' . date( 'Y', strtotime( $d->datebegin ) ) . 'г.';

			$dateSignature = date( 'j', strtotime( $d->datesignature ) ) . ' ' . $monthes[ date( 'n', strtotime( $d->datesignature ) ) ] . ' ' . date( 'Y', strtotime( $d->datesignature ) ) . 'г.';

			$dateEnd = date( 'j', strtotime( $d->dateend ) ) . ' ' . $monthes[ date( 'n', strtotime( $d->dateend ) ) ] . ' ' . date( 'Y', strtotime( $d->dateend ) ) . 'г.';

			$columns .= '
						<tr>
							<td>' . $d->title . '</td>
							<td>' . $d->description . '</td>
							<td>' . $docUser->surname . ' ' . $docUser->name . ' ' . $docUser->middlename . ' ' . '</td>
							<td>' . $dateBegin . '</td>
							<td>' . $dateSignature . '</td>
							<td>' . $dateEnd . '</td>
						</tr>
						';
		}


		$html = '<h1 style="text-align: center;">' . $user->surname . ' ' . $user->name . ' ' . $user->middlename . '<br>' . 'Таблица документов сотрудника</h1>
				<table border="1px" cellspacing="3" cellpadding="4" style="text-align: center;">
				<tr>
					<td><b>Название документа</b></td>
					<td><b>Описание документа</b></td>
					<td><b>Кто добавил</b></td>
					<td><b>Дата добавления</b></td>
					<td><b>Дата подписания</b></td>
					<td><b>Дата пересмотра</b></td>
				</tr>' . $columns . '
				</table>
				<br/>
				';

			// Выводим данные используя HTML теги
			$pdf->writeHTML($html);

		$i++;
	}

	// конец страницы Table of Content
	$pdf->endTOCPage();


	//Вывод документ в pdf формате
	$pdf->Output('docs.pdf');
?>
