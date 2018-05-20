<?php require_once '../asset/header.php'; ?>


<!-- Main layout -->
<div class="container">
	<div class="layout-wrapper">
		<div class="add-wrapper display-none" data-toggle="modal" data-target="#add-box"><i class="fas fa-plus"></i></div>
	</div>
</div>


<!-- Modal -->
<div class="modal fade" id="add-box" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">새로운 채널을 만들어보세요!</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="dropdown col-sm-4">
						<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							타입
						</button>
						<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<div class="dropdown-item" >audio_book</div>
							<div class="dropdown-item" >daily</div>
							<div class="dropdown-item" >rookie_creater_channel</div>
							<div class="dropdown-item" >new_channel</div>
							<div class="dropdown-item" >clip_chart</div>
							<div class="dropdown-item" >audio_creater_channel</div>
						</div>
					</div>
					<div class="col-sm-8" id="selected-value-type"></div>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
				<button type="button" class="btn btn-primary create-btn">생성하기</button>
			</div>
		</div>
	</div>
</div>

<?php require_once '../asset/footer.php'; ?>

