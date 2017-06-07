<?php

	function connect_db() {
		$db = mysqli_connect(HOST, USER, PASSWORD, DB);

		if ( mysqli_connect_error($db) ) {
			exit('Нет соединения с БД');
		}

		return $db;
	}

	function get_tables($db) {
		$sql = "SHOW TABLES";
		$result = mysqli_query($db, $sql);

		if ( !$result ) {
			exit( mysqli_error( $db ) );
		}

		$tables = array();

		for ( $i = 0; $i < mysqli_num_rows($result); $i++ ) {
			$row = mysqli_fetch_row($result);

			$tables[] = $row[0];
		}

		$tabs = array(
			"department",
			"position",
			"documenttype",
			"user",
			"document"
		);

		return $tabs;
	}

	function get_dump( $db, $tables ) {
		if (  is_array( $tables ) ) {
			$fp = fopen( DIR_SQL . time() . '_dump.sql', 'w' );

			$text = "-- SQL DUMP\n" .
			  ltrim("-- my_version: 1.00\n") .
			  ltrim("--\n") .
			  ltrim("-- База данных: `" . DB . "`\n") .
			  ltrim("--\n") .
			  ltrim("-- -------------------------\n") .
			  ltrim("-- -------------------------\n\n") .
			  ltrim("USE " . DB . ";\n");

			fwrite($fp, $text);

			foreach ($tables as $item) {

				$text = "\n-- -------------------------\n" .
				    ltrim("-- Структура таблицы - `" . $item . "`\n") .
				    ltrim("-- -------------------------\n\n");

				fwrite($fp, $text);

				$text = "";
				$text .= "DROP TABLE IF EXISTS `" . $item . "`;";
				$sql = 'SHOW CREATE TABLE ' . $item;
				$result = mysqli_query($db, $sql);

				if ( !$result ) {
					exit( mysqli_error($db) );
				}

				$row = mysqli_fetch_row( $result );

				$text .= "\n" . $row[1] . ";";

				fwrite($fp, $text);

				$text = '';
				$text .= ("\n\n-- -------------------------\n") .
				        ltrim("-- Dump DB - tables: `" . $item . "`\n") .
				        ltrim("-- -------------------------\n");

				$sql2 = "SELECT * FROM `" . $item . "`";

				$result2 = mysqli_query($db, $sql2);

				if ( !$result2 ) {
					exit( mysqli_error() );
				}

				if ( mysqli_num_rows( $result2 ) > 0 ) {
					$text .= "\nINSERT INTO `" . $item . "` VALUES";
				}

				fwrite($fp, $text);

				$text = "";

				for ( $i = 0; $i < mysqli_num_rows( $result2 ); $i++ ) { 
					$row = mysqli_fetch_row( $result2 );

					if ( $i === 0 ) {
						$text .= "(";
					} else {
						$text .= ",\n(";
					}

					foreach ($row as $value) {
						if ( isset($value) AND $value != NULL ) {
							$text .= "\"" . mysqli_real_escape_string($db, $value) . "\", ";
						} else {
							$text .= "NULL, ";
						}
					}

					$text = rtrim($text, ", ");

					$text .= ")";

					if ( $i > FOR_WRITE ) {
						fwrite( $fp, $text );
						$text = '';
					}
				}

				$text .= ";\n";

				fwrite( $fp, $text );

			}
		}

		fclose($fp);
	}

	function import_dump_db($db) {
		$dump = scandir( DIR_SQL, SCANDIR_SORT_DESCENDING );

		$sqlfile = DIR_SQL . $dump[0]; // файл который нужно загрузить

	    if ( !file_exists( $sqlfile ) );

	    $open_file = fopen ( $sqlfile, "r" );
	    $buf = fread( $open_file, filesize( $sqlfile ) );

	    fclose ( $open_file );

	    $a = 0;

	    while ( $b = strpos( $buf, ";\n", $a+1 ) ) {
		    $i++;

		    $a = substr( $buf ,$a+1, $b-$a );

		    mysqli_query( $db, $a );

		    $a = $b;
	    }
		
		echo 'Ok';
	}

?>