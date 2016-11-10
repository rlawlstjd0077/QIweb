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


$(document).ready(function() { // �ε��� ���ÿ� ���� �� ���ϴ� modal ���
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

$(document).on("click", "#open_qmodal", function() { // '+' button Ŭ����
	$('#create_question').openModal();
});

$(document).on("click", "#create_question .modal-footer #confirm", function() {
	console.log("���Ƚ��ϴ�.");

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
	$('body').append('<div id = "' + title + '">' + "</div>"  );		//Į������  ����Ű�� index
	$question = $('#' + title);
	$question.append('<h4 class = "' + title +'">' + title + '</h4>');
	$question.append('<input type = "text" placeholder="�亯 ����" >');
	$question.append('<input type = "text" class = "type" value ="' + type + '" hidden>');
}
/*
 * function showSetContent(type, title){
 * 
 * console.log(type); var $content = $('#create_question .modal-content'); var
 * $footer = $('#create_question .modal-footer');
 * 
 * if(type == "selective"){ $footer.append('<a class="waves-effect waves-light
 * btn" id="item_add">item �߰�</a>'); $footer.append('<a class="waves-effect
 * waves-light btn" id="item_delete">item ����</a>'); $footer.append('<a
 * class="waves-effect waves-green btn-flat" id="sel_submit">Ȯ��</a>'); }else{
 * $footer.append('<a class="waves-effect waves-green btn-flat"
 * id="srt_submit">Ȯ��</a>'); } $content.append('<h4 id = "title"> ���� �׸� <h4>');
 * $content.append('<input placeholder="�亯 ����" name="item" type="text"
 * id="item1" class="item">'); }
 */
$(document).on("click", "#srt_submit", function() { // �ܴ���, Ȯ�� ��ư Ŭ����

});

$(document)
		.on(
				"click",
				"#item_add",
				function() { // ������ �߰�
					var text_list = document.getElementsByClassName("item"); 
					var $content = $('#create_item .modal-content');
					$content.append('<input placeholder="�亯 ����" name="item" type="text" id="item'
									+ (text_list.length + 1)
									+ '" class="item">'); // append textForm
					itemCnt += 1;
					setOptions();
				});

function setOptions() { // ���� ���� ����
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
$(document).on("click", "#item_delete", function() { // ������ ����
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
					var text_list = document.getElementsByClassName("item"); // ����
																				// ����
																				// ��������
					var sel_num = document.getElementById("selector");

					for (var i = 0; i < text_list.length; i++) {
						item_list[i] = text_list[i].value;
					}

					if (sel_num != null)
						choice = sel_num.value;

					
					$('body').append('<div id = "' + title + '">' + "</div>"  );		//Į������  ����Ű�� index
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
									+ listCnt + '">����</a>');
					listCnt++;
					var $empty_content = $('#create_item .modal-content');
					$empty_content.empty();
					$empty_content.append("<h4>������</h4>");
					$empty_content.append('<input placeholder="�亯 ����" name="item" type="text" id="item1" class="item">');
					$('#create_item').closeModal();
					itemCnt = 1;
				});
/*
 * $(document).on("click", "#sel_submit", function(){ //�� ��° Ȯ�� ��ư Ŭ�� �� var
 * text_list = document.getElementsByClassName("item"); //���� ���� �������� var sel_num =
 * document.getElementById("selector");
 * 
 * for(var i = 0; i < text_list.length; i++){ item_list[i] = text_list[i].value; }
 * 
 * if(sel_num != null) choice = sel_num.value;
 * 
 * var $remove_node = $('.modal-content'); $remove_node.empty(); //content �����
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
	
	if(q_cnt == 0)		// ������ ������ �ʾ��� �� 
		return 0;
	var qi_content = new Object();
	qi_content.title = qi_title;
	var content = new Array();
	
	for(var i = 0; i < title_list.length; i++){
		if(title_list[i] == null)		//������ ���� ���� ���
			continue;
		var q_info = Object();
		titleTmp = title_list[i];				//title �� ����
		q_info.title = titleTmp;
		
		
		type = $('#' + title_list[i] + ' .type').val();
		q_info.type = type;
		console.log(type);
		if(type == "short_answer"){
			
		}else{
		max_sel = $('#' + title_list[i] + ' .max_sel').val();		//�ִ� ���� ����
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
 * $(this).attr('for'); //���õ� label ���ϱ� var $sel_box =
 * $($('input:checkbox[id="'+ sel_num +'"]'));
 * 
 * if($sel_box.is(":checked") == true){ console.log("üũ ���־���"); total_sel--;
 * }else if(total_sel >= 3 ){ $('input:checkbox[id="0"]').prop("checked",
 * false); }else{ total_sel++; } });
 */