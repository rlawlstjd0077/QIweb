var itemCnt = 1;
var qi_title;
var choice = 1;
var item_list = new Array();
var title_list = new Array();
var type;
var title;
var div_index = 0;
var listCnt = 0;
var q_cnt = 0;


$(document).ready(function() { // 로딩과 동시에 설문 명 정하는 modal 출력
	// the "href" attribute of .modal-trigger must specify the modal ID that
	// wants to be triggered
	$("#create_qi").openModal({
		dismissible: false
	});

});

$(document).on("click", "#create_qi .modal-footer #confirm", function() {
	qi_title = $("#qi_title").val();
	
	$("#create_qi").closeModal();
	$('body').append("<h1>" + qi_title + "</h1>");
});

$(document).on("click", "#create_qi .modal-footer #delete", function() {
	location.href = "index.jsp";
});

$(document).on("click", "#open_qmodal", function() { // '+' button 클릭시
	$('#create_question').openModal();
});

$(document).on("click", "#create_question .modal-footer #confirm", function() {
	console.log("눌렸습니다.");

	type = $(":input:radio[name=group1]:checked").val();
	console.log(type);
	title = $("#title").val(); // save title
	q_cnt++;
	title_list[listCnt] = title;
	
	if(type == "short_answer"){
		$('#create_question').closeModal();
		short_answer();
		return 0;
	}

	$('#title').val("");	
	$('#create_question').closeModal();
	$('#create_item').openModal();

});

function short_answer(){
	$('body').append('<div id = "' + title + '">' + "</div>"  );		//칼럼명을  가리키는 index
	$question = $('#' + title);
	$question.append('<h4 class = "' + title +'">' + title + '</h4>');
	$question.append('<input type = "text" placeholder="답변 내용" >');
	$question.append('<input type = "text" class = "type" value ="' + type + '" hidden>');
}
/*
 * function showSetContent(type, title){
 * 
 * console.log(type); var $content = $('#create_question .modal-content'); var
 * $footer = $('#create_question .modal-footer');
 * 
 * if(type == "selective"){ $footer.append('<a class="waves-effect waves-light
 * btn" id="item_add">item 추가</a>'); $footer.append('<a class="waves-effect
 * waves-light btn" id="item_delete">item 삭제</a>'); $footer.append('<a
 * class="waves-effect waves-green btn-flat" id="sel_submit">확인</a>'); }else{
 * $footer.append('<a class="waves-effect waves-green btn-flat"
 * id="srt_submit">확인</a>'); } $content.append('<h4 id = "title"> 질문 항목 <h4>');
 * $content.append('<input placeholder="답변 내용" name="item" type="text"
 * id="item1" class="item">'); }
 */
$(document).on("click", "#srt_submit", function() { // 단답형, 확인 버튼 클릭시

});

$(document)
		.on(
				"click",
				"#item_add",
				function() { // 아이템 추가
					var text_list = document.getElementsByClassName("item"); 
					var $content = $('#create_item .modal-content');
					$content.append('<input placeholder="답변 내용" name="item" type="text" id="item'
									+ (text_list.length + 1)
									+ '" class="item">'); // append textForm
					itemCnt += 1;
					setOptions();
				});

function setOptions() { // 선택 개수 세팅
	var $rm_select = $('#select');
	$rm_select.remove();

	var $select = $('#create_item .modal-content h4');
	$select
			.append('<div class="col s6 m6" id="select"><label>Browser select</label><select class="browser-default" id="selector"></select></div>');
	var $options = $('#selector');
	forOptionSetting($options);
	console.log(itemCnt);
}

function forOptionSetting($options) {
	for (var i = 1; i <= itemCnt; i++) {
		$options.append('<option value="' + i + '">' + i + '</option>');
	}
}
$(document).on("click", "#item_delete", function() { // 아이템 삭제
	var text_list = document.getElementsByClassName("item");
	itemCnt = text_list.length;
	if (itemCnt == 1) {
		return false;
	}
	var $remove_node = document.getElementById("item" + itemCnt--);
	$remove_node.remove();
	setOptions();
});

$(document).on("click", "#create_item .modal-footer #confirm", function() {
					var text_list = document.getElementsByClassName("item"); // 질문
																				// 내용
																				// 가져오기
					var sel_num = document.getElementById("selector");

					for (var i = 0; i < text_list.length; i++) {
						item_list[i] = text_list[i].value;
					}

					if (sel_num != null)
						choice = sel_num.value;

					
					$('body').append('<div id = "' + title + '">' + "</div>"  );		//칼럼명을  가리키는 index
					$question = $('#' + title);
					$question.append('<h4 class = "' + title +'">' + title + '</h4>');
					$question.append('<input type="text" name="title" value ="'
							+ title + '" hidden>');
					$question.append('<input type = "text" class = "max_sel" value = "' + choice + '" hidden>');
					$question.append('<input type = "text" class = "type" value ="' + type + '" hidden>');
					for (var i = 0; i < itemCnt; i++) {
						$question.append('<p><input type="checkbox" class = "' + i
								+ '" name="' + i + '" value = "' + item_list[i]
								+ '">' + '<label for ="' + i + '">'
								+ item_list[i] + '</label>');
					}
					$question.append('<input type = "text" class = "item_num" value = "' + itemCnt +'" hidden>');
					$question.append('<a class="waves-effect waves-light btn delete-btn" id ="'
									+ listCnt + '">삭제</a>');
					listCnt++;
					var $empty_content = $('#create_item .modal-content');
					$empty_content.empty();
					$empty_content.append("<h4>선택지</h4>");
					$empty_content.append('<input placeholder="답변 내용" name="item" type="text" id="item1" class="item">');
					$('#create_item').closeModal();
					itemCnt = 1;
				});
/*
 * $(document).on("click", "#sel_submit", function(){ //두 번째 확인 버튼 클릭 시 var
 * text_list = document.getElementsByClassName("item"); //질문 내용 가져오기 var sel_num =
 * document.getElementById("selector");
 * 
 * for(var i = 0; i < text_list.length; i++){ item_list[i] = text_list[i].value; }
 * 
 * if(sel_num != null) choice = sel_num.value;
 * 
 * var $remove_node = $('.modal-content'); $remove_node.empty(); //content 지우기
 * 
 * var $modal_foot = $('.modal-footer'); $modal_foot.empty();
 * 
 * 
 * $remove_node.append('<h4>' + title +'<h4>'); $remove_node.append('<input
 * type="text" name="title" value ="' + title +'" hidden>'); for(var i = 0; i <
 * itemCnt; i++){ $remove_node.append('<p><input type="checkbox" id = "' + i + '"
 * name="' + i +'" value = "' + item_list[i] +'">'+ '<label for ="' + i + '">' +
 * item_list[i] + '</label>'+ '<input type="text" name="' + i + '" value="' +
 * item_list[i] + '" hidden></p>');
 *  } $remove_node.append('<input type="text" name="cnt" value = "' + itemCnt
 * +'"hidden>'); $modal_foot.append('<button class="btn waves-effect
 * waves-light" type="submit" name="action">Submit<i class="material-icons
 * right">send</i></button>'); $modal_foot.append('<a href="/good/qi"
 * class="waves-effect waves-green btn-flat submit modal-close" id="make" >Agree</a>');
 * $modal_foot.append('<a class="waves-effect waves-green btn-flat modal-close"
 * id="delete" >Delete</a>'); });
 */

$(document).on("click", ".template", function() {
	var button = ($(this).attr('id'));
});

$(document).on("click", ".delete-btn", function(){
	var del_title = ($(this).attr('id'));
	var title_tmp = title_list[Number(del_title)]; 
	title_list[Number(del_title)] = null;
	q_cnt --;
	console.log(del_title);
	var $del_question = $('#' + title_tmp);
	$del_question.remove();
});

$(document).on("click", "#submit", function(){
	var max_sel;
	var titleTmp;
	var sel_list = new Array;
	var item_num;
	var qiInfoJson = new Object();
	var qiJsonArray = new Array();
	
	if(q_cnt == 0)		// 질문을 만들지 않았을 때 
		return 0;
	var qi_content = new Object();
	qi_content.title = qi_title;
	var content = new Array();
	
	for(var i = 0; i < title_list.length; i++){
		if(title_list[i] == null)		//질문을 삭제 했을 경우
			continue;
		var q_info = Object();
		titleTmp = title_list[i];				//title 값 저장
		q_info.title = titleTmp;
		
		
		type = $('#' + title_list[i] + ' .type').val();
		q_info.type = type;
		console.log(type);
		if(type == "short_answer"){
			
		}else{
		max_sel = $('#' + title_list[i] + ' .max_sel').val();		//최대 개수 저장
		q_info.max_sel = max_sel;
		item_num = Number($('#' + title_list[i] + ' .item_num').val());
		var data_array = new Array();
		for(var j = 0; j < item_num; j++ ){
			var data = new Object();
			sel_list[j] = $('#' + title_list[i] + ' .' + j).val();
			
			data.number = j;
			data.name = sel_list[j];
			console.log(sel_list[j]);
			data_array.push(data);
		}
		q_info.datas = data_array;
		}
		content.push(q_info);
	}
	qi_content.content = content;
	
	var finalJsonData = JSON.stringify(qi_content);
	console.log(finalJsonData);
	
	var xhttp;
	
	
	var request = $.ajax({
		url: "insertData.jsp",
		type: "POST",
		data:finalJsonData,
		dataType:"json"
	});
	request.done(function(data){
		if(data != null){
			if(data.error==2){
				
			}
		}
	});
	
});
/*
 * $(document).on("click", "label", function(){ var sel_num =
 * $(this).attr('for'); //선택된 label 구하기 var $sel_box =
 * $($('input:checkbox[id="'+ sel_num +'"]'));
 * 
 * if($sel_box.is(":checked") == true){ console.log("체크 되있었음"); total_sel--;
 * }else if(total_sel >= 3 ){ $('input:checkbox[id="0"]').prop("checked",
 * false); }else{ total_sel++; } });
 */