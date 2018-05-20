<!DOCTYPE html>
	<html>
		<head>
			<!-- Setting -->
			<meta charset="UTF-8">
			<!-- Import CSS file-->

			<!-- External -->
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
			<link href='https://cdn.rawgit.com/openhiun/hangul/14c0f6faa2941116bb53001d6a7dcd5e82300c3f/nanumbarungothic.css' rel='stylesheet' type='text/css'>
			
			<!-- Internal -->
			<link rel="stylesheet" type="text/css" href="../css/modify_layout.css?ver=<?php echo stat('../css/modify_layout.css')['mtime'] ?>">
			<link rel="stylesheet" type="text/css" href="../css/slot.css?ver=<?php echo stat('../css/slot.css')['mtime'] ?>">
			<link rel="stylesheet" type="text/css" href="../css/menu.css?ver=<?php echo stat('../css/menu.css')['mtime'] ?>">

			<!-- DB Setting -->
			<?php
				include '../config/db_config.php';
				include '../config/db_lib.php';
			?>
		</head>

		<body>
			<div class="menu-container">
				<div class="row menu-wrapper">
					<div class="col-sm-2 logo"></div>
					<div class="col-sm-6"><div id="id_label"></div></div>
					<div class="col-sm-4 login">
						<input id="user_id" type="text" class="form-control" placeholder="ID" />
						<button id="login_btn" type="button" class="btn btn-primary inline-btn">로그인</button>
						<button type="button" id="modify" class="btn btn-info display-none">편집</button>
						<input type="hidden" id="loggined_id" value=""/>
					</div>
				</div>
			</div>