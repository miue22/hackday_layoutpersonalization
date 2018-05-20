/**             편집 버튼 토글             **/
$("#modify").on("click", function(){
	var component = $(".layout-box");
	var index = 0;

	if(component.attr("draggable") == "false" ){ //편집시작시
		// 각 상태 활성화
		$("#modify").html('완료');
		component.attr("draggable", "true");
		component.on("dragstart", onDragStart);
		component.on("dragenter", onDragEnter);
		component.on("dragover", onDragOver);
		component.on("dragend", onDragEnd);
		component.on("dragleave", onDragLeave);
		component.on("drop", onDrop);

		//버튼 출현 및 이벤트 바인딩
		$(".remove-btn").show("slow");
		$(".remove-btn").animateCss("fadeInUp");
		$(".remove-btn").on("click", removeComponent);

		$(".add-wrapper").show("slow");
		$(".add-wrapper").animateCss("fadeInUp");
	}
	else{ //편집완료시
		//각 상태 비활성화
		$("#modify").html('편집');
		component.attr("draggable", "false");
		component.off();
		
		//버튼 숨기기
		$(".remove-btn").hide();
		$(".remove-btn").off();
		$(".add-wrapper").hide();

		//현재 Layout order에 대한 Json 데이터 생성
		var jsonData = makeData(component);
		console.log(makeData(component));

		//변경된 레이아웃 업로딩
		$.ajax({
	        type: "PUT",
	        url : "../api/member_controller.php",
	        data : {
	        	id : $("#loggined_id").val(),
	            custom : jsonData
	        },

	        success:function(response){
	            alert("변경완료!");
	            var id = $("#user_id").val();
				layout_init(id);
	        },
	        error:function (xhr, ajaxOptions, thrownError){
	            alert(xhr.responseText);
	        }
	    });
	}
});

function makeData(component){
	//현재 상태를 저장한 json 생성
	var len = component.length;

	if(len == 0){
		return "";
	}
	var json = new Object();
	var tempArray = new Array();
	var tempObj;
	for(var i = 0; i<len; i++){
		tempObj = new Object();
		tempObj.type = $(component[i]).find(".type").data('type');
		tempArray.push(tempObj);
	}
	json.custom = tempArray;

	return JSON.stringify(tempArray);
}

function removeComponent(event){
	var target = event.target.closest(".layout-box");
	$(target).animateCss("fadeOut", function(){ target.remove(); });
}

/*             Dropdown-item binding             */
$(".dropdown .dropdown-item").on("click", function(event){
	$("#selected-value-type").html(event.target.innerHTML);
});

/*             Modal create binding             */
$(".create-btn").on("click", function(event){
	var channel_type = $("#selected-value-type").html(); // 타입

	var no = $(".layout-box").length+1; //요소 넘버
	var inner = `<div id="box${no}" class="layout-box display-none" draggable="true" "><div class="remove-wrapper"><i class="remove-btn fas fa-minus-circle"></i></div><div class="type" data-type="${channel_type}">${channel_type}</div></div>`;
	$(".add-wrapper").before(inner);

	//화면에 출력
	$(`#box${no}`).show("slow");
	$(`#box${no}`).animateCss("fadeInUp");
	$(`#box${no}`).removeClass("display-none");

	//새로운 요소 바인딩
	$(`#box${no} .remove-btn`).on("click", removeComponent);
	$(`#box${no}`).on("dragstart", onDragStart);
	$(`#box${no}`).on("dragenter", onDragEnter);
	$(`#box${no}`).on("dragover", onDragOver);
	$(`#box${no}`).on("dragend", onDragEnd);
	$(`#box${no}`).on("dragleave", onDragLeave);
	$(`#box${no}`).on("drop", onDrop);

	//모달 초기화 후 닫기
	$("#selected-value-type").html('');
	$("#add-box .close").click()
});

