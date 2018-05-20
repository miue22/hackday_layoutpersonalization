layout_init("");
function layout_init(id){ //최초 로딩시 로그인된 사용자의 레이아웃 호출 후 렌더링
	console.log(id);
	var default_set = '[{"type":"daily"},{"type":"new_channel"},{"type":"clip_chart"},{"type":"rookie_creater_channel"},{"type":"audio_book"},{"type":"audio_creater_channel"}]';
	if(id){
		$.ajax({
	        type: "GET",
	        url : "../api/member_controller.php",
	        data : {
	        	id : id
	        },
	        success:function(response){
	        	console.log("로그인 사용자");
	        	var res = JSON.parse(response);
     
	        	$("#modify").css("display","inline");
	        	$("#id_label").html(`<p>로그인된 아이디 : <span id="id_label">${id}</span></p>`);
	        	$("#loggined_id").val(id);


        		$(".layout-box").remove();
				if(res['data'][0].custom == ""){ //사용자 개인 설정이 없을 경우
					console.log("No layout setting! default set!")
					var jsonData = JSON.parse(default_set);
				}
				else{
					var jsonData = JSON.parse(res['data'][0].custom);
				}
				
				for (var i in jsonData) { //사용자 설정 각 요소에 대한 렌더링
					getInner( i, jsonData[i].type);
				}
	            console.log("loading complete");
	        },
	        error:function (xhr, ajaxOptions, thrownError){
	            console.log(xhr.responseText);
	            alert("로그인 실패");
	        }
    	});
	}
	else{
    	console.log("미로그인 사용자");

		jsonData = JSON.parse(default_set);

		for (var i in jsonData) {
			getInner( i, jsonData[i].type);
		}
        console.log("loading complete");
	}	
}


function getInner( i, type){ //사용자 설정 렌더링
	switch (type) {
		case 'daily':
			console.log("daily");
			daily(i);
			break;
		case 'audio_book': 
			console.log("audio_book");
			audio_book(i);
		   	break;
		case 'rookie_creater_channel': 
			console.log("rookie_creater_channel");
			rookie_creater_channel(i);
		   	break;
		case 'audio_creater_channel': 
			console.log("audio_creater_channel");
			audio_creater_channel(i);
		   	break;
		case 'clip_chart':
			console.log("clip_chart");
			clip_chart(i);
			break;
		case 'new_channel': 
			console.log("new_channel");
			new_channel(i);
			break;
		default : 
			console.log(type);
			break;
	}
}

function daily(i){
	var inner = `<div id="box${Number(i)+1}" class="layout-box" draggable="false">
				<div class="remove-wrapper"><i class="remove-btn display-none fas fa-minus-circle"></i><span class="type" data-type="daily">오늘의 추천 채널</span></div>
				<div class="content-wrapper row">
					<div class="col-sm-6 left">
					</div>
					<div class="col-sm-6 right">
					</div>
				</div>
			</div>`;
	$(".layout-wrapper .add-wrapper").before(inner); 
	$.ajax({
	    type: "GET",
	    url : "../api/clip_data_controller.php",
	    data : {
	    	start : 0,
	    	num : 10,
	    },
	    success:function(response){
	    	var res = JSON.parse(response);
			var clipData = res['data'];
			var left = "";
			var right = "";
			for (var j in clipData){
				if(Number(j) < 5){
					left += `<div class="daily-clip-wrapper">
								<div class="daily-img" style="background-image: url(${clipData[j].channel_img})"></div>
								<div class="daily-title">
									<p>${clipData[j].channel_name}</p>
									구독자 ${clipData[j].follower}명
								</div>
							</div>`;
				}
				else if(Number(j) < 10){
					right += `<div class="daily-clip-wrapper">
								<div class="daily-img" style="background-image: url(${clipData[j].channel_img})"></div>
								<div class="daily-title">
									<p>${clipData[j].channel_name}</p>
									구독자 ${clipData[j].follower}명
								</div>
							</div>`;
				}

				$(`#box${Number(i)+1} .left`).html(left);
				$(`#box${Number(i)+1} .right`).html(right);
				
			}
	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        console.log(xhr.responseText);
	    }
	});
}

function audio_book(i){
	var inner = `<div id="box${Number(i)+1}" class="layout-box" draggable="false">
							<div class="remove-wrapper"><i class="remove-btn display-none fas fa-minus-circle"></i><span class="type" data-type="audio_book">오디오 북</span></div>
							<div class="content-wrapper row inside">
							</div>
						</div>`;
	$(".layout-wrapper .add-wrapper").before(inner);

	$.ajax({
	    type: "GET",
	    url : "../api/clip_data_controller.php",
	    data : {
	    	start : 15,
	    	num : 6,
	    },
	    success:function(response){
	    	var res = JSON.parse(response);
			var clipData = res['data'];
			var inner ="";
	    	var inside = "";
			for (var j in clipData){
				inside +=`<div class="col-sm-2">
								<div class="new-channel-clip-wrapper">
									<div class="new-channel-img" style="background-image: url(${clipData[j].channel_img})"></div>
									<div class="new-channel-title">
										<p>${clipData[j].channel_name}</p>
										구독자 ${clipData[j].follower}명
									</div>
								</div>
							</div>`;


			}
			$(`#box${Number(i)+1} .inside`).html(inside);
	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        console.log(xhr.responseText);
	    }
	});
}

function rookie_creater_channel(i){
	var inner = `<div id="box${Number(i)+1}" class="layout-box" draggable="false">
							<div class="remove-wrapper"><i class="remove-btn display-none fas fa-minus-circle"></i><span class="type" data-type="rookie_creater_channel">루키 크리에이터 채널</span></div>
							<div class="content-wrapper row inside">
							</div>
						</div>`;
	$(".layout-wrapper .add-wrapper").before(inner);	

	$.ajax({
	    type: "GET",
	    url : "../api/clip_data_controller.php",
	    data : {
	    	start : 35,
	    	num : 6,
	    },
	    success:function(response){
	    	var res = JSON.parse(response);

			var clipData = res['data'];
			var inner ="";
	    	var inside = "";
			for (var j in clipData){
				inside +=`<div class="col-sm-2">
								<div class="new-channel-clip-wrapper">
									<div class="new-channel-img" style="background-image: url(${clipData[j].channel_img})"></div>
									<div class="new-channel-title">
										<p>${clipData[j].channel_name}</p>
										구독자 ${clipData[j].follower}명
									</div>
								</div>
							</div>`;
			}
			
			
			$(`#box${Number(i)+1} .inside`).html(inside);
	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        console.log(xhr.responseText);
	    }
	});
}

function audio_creater_channel(i){
	var inner = `<div id="box${Number(i)+1}" class="layout-box" draggable="false">
							<div class="remove-wrapper"><i class="remove-btn display-none fas fa-minus-circle"></i><span class="type" data-type="audio_creater_channel">오디오 크리에이터 채널</span></div>
							<div class="content-wrapper row inside">
							</div>
						</div>`;
	$(".layout-wrapper .add-wrapper").before(inner);	
	$.ajax({
	    type: "GET",
	    url : "../api/clip_data_controller.php",
	    data : {
	    	start : 47,
	    	num : 6,
	    },
	    success:function(response){
	    	var res = JSON.parse(response);

			var clipData = res['data'];
			var inner ="";
			var inside = "";
			for (var j in clipData){
				inside +=`<div class="col-sm-2">
								<div class="new-channel-clip-wrapper">
									<div class="new-channel-img" style="background-image: url(${clipData[j].channel_img})"></div>
									<div class="new-channel-title">
										<p>${clipData[j].channel_name}</p>
										구독자 ${clipData[j].follower}명
									</div>
								</div>
							</div>`;
			}
			
			$(`#box${Number(i)+1} .inside`).html(inside);

	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        console.log(xhr.responseText);
	    }
	});
}

function clip_chart(i){
	var inner = `<div id="box${Number(i)+1}" class="layout-box" draggable="false">
							<div class="remove-wrapper"><i class="remove-btn display-none fas fa-minus-circle"></i><span class="type" data-type="clip_chart">클립 차트</span></div>
							<div class="content-wrapper row">
								<div class="col-sm-6 left">
								</div>
								<div class="col-sm-6 right">
								</div>
							</div>
						</div>`;
	$(".layout-wrapper .add-wrapper").before(inner);
	$.ajax({
	    type: "GET",
	    url : "../api/clip_data_controller.php",
	    data : {
	    	start : 112,
	    	num : 10,
	    },
	    success:function(response){
	    	var res = JSON.parse(response);
			var clipData = res['data'];
	    	var left = "";
			var right = "";

			for (var j in clipData){
				if(Number(j) < 5){
					left += `<div class="clip-chart-wrapper">
								<div class="clip-chart-ranking">
									<p>${Number(j)+1}</p>
								</div>
								<div class="clip-chart-image" style="background-image: url(${clipData[j].channel_img})"></div>
								<div class="clip-chart-title">
									<p>${clipData[j].channel_name}</p>
									<div class="detail-wrapper">
										<span class="view"><i class="far fa-caret-square-right"></i>${clipData[j].follower}</span><span class="detail">${clipData[j].cp_name}</span>
									</div>
								</div>
							</div>`;
				}
				else if(Number(j) < 10){
					right += `<div class="clip-chart-wrapper">
								<div class="clip-chart-ranking">
									<p>${Number(j)+1}</p>
								</div>
								<div class="clip-chart-image" style="background-image: url(${clipData[j].channel_img})"></div>
								<div class="clip-chart-title">
									<p>${clipData[j].channel_name}</p>
									<div class="detail-wrapper">
										<span class="view"><i class="far fa-caret-square-right"></i>${clipData[j].follower}</span><span class="detail">${clipData[j].cp_name}</span>
									</div>
								</div>
							</div>`;
				}
				
			}

			$(`#box${Number(i)+1} .left`).html(left);
			$(`#box${Number(i)+1} .right`).html(right);
		
	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        console.log(xhr.responseText);
	    }
	});
}

function new_channel(i){
	var inner = `<div id="box${Number(i)+1}" class="layout-box" draggable="false">
							<div class="remove-wrapper"><i class="remove-btn display-none fas fa-minus-circle"></i><span class="type" data-type="new_channel">신규 채널</span></div>
							<div class="content-wrapper row inside">
							</div>
						</div>`;
	$(".layout-wrapper .add-wrapper").before(inner);
	$.ajax({
	    type: "GET",
	    url : "../api/clip_data_controller.php",
	    data : {
	    	start : 77,
	    	num : 6,
	    },
	    success:function(response){
	    	var res = JSON.parse(response);
			var clipData = res['data'];
			var inner ="";
			var inside = "";
			for (var j in clipData){
				inside +=`<div class="col-sm-2">
								<div class="new-channel-clip-wrapper">
									<div class="new-channel-img" style="background-image: url(${clipData[j].channel_img})"></div>
									<div class="new-channel-title">
										<p>${clipData[j].channel_name}</p>
										구독자 ${clipData[j].follower}명
									</div>
								</div>
							</div>`;
			}
			$(`#box${Number(i)+1} .inside`).html(inside);
	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        console.log(xhr.responseText);
	    }
	});
}