
/**
 * 
 */

var arr;			//itemlist
var clickItem;		//title
var max_sel;
var result_arr = [];
var cnt;
var list_cnt = 0;		//���� ���� ������ üũ
var totalChecked = 0;

$(document).on("click", "#qiList", function(){
	var xhhtp;
	clickItem = event.target.id;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status ==200){
				console.log("�� �Ѿ��");
				arr = (xhttp.responseText).split(" ");
				cnt = 0;
				list_cnt = 0;
					for(var i = 0; i < arr.length - 1; i++){		//��� ���� ����� �ִ� ��츦 �����ϱ� ���ؼ� 
						result_arr[cnt++] = arr[i];
					}
					firstQuestion();
			}
		}
	var req_title = encodeURIComponent(clickItem);
	xhttp.open("POST", "getcolumn.jsp?q=" + req_title, true);
	xhttp.send();
});

function makeQi(){
	$modal = $("#modal2 .modal-content");
	$modal.empty();
	$modal.append("<h4>" + clickItem + "</h4>");
	for(var i = 0; i < arr.length - 1; i++){
		if(arr[i] != "" || arr[i] != null){
			$modal.append('<p><input type="checkbox" id = "' + i + '" name="' + i +
					'" value = "' + arr[i] +'">'+ '<label for ="' + i + '">' 
					+ arr[i] + '</label>');	
		}
	}
	
	$('#modal2').openModal();
}
function initMaxsel(max){
	console.log(max);
	max_sel = max;
}

function firstQuestion(){
		make_qi(list_cnt++);
}
function make_qi(index){	
		var parse_result = JSON.parse(result_arr[index]);
		var q_title = parse_result.title;
		console.log("title : " + q_title);
		initMaxsel(parse_result.max_sel);		//max_sel �� ����		
		//datas �� ���� ���ϱ�
		$modal = $("#modal2 .modal-content");
		$modal.empty();
		$modal.append("<h4>" + q_title + "</h4>");
		
		var type = parse_result.type;
		if(type == "short_answer"){
			$modal.append('<input type = "text" placeholder="�亯 ����">');
		}else{
			var count = Object.keys(parse_result.datas).length;
			for(var j = 0; j < count; j++){
				var data = parse_result.datas[j].name;
				$modal.append('<p><input type="checkbox" id = "' + j + '" name="' + j +
						'" value = "' + data +'" class = "select" onclick=CountChecked(this)>' +
						'<label for ="' + j + '">' 
						+ data + '</label>');	
			}
		}
		$('#modal2').openModal();
}

$(document).on("click", "#qi_submit", function(){
	if(list_cnt >= result_arr.length){
		$('#modal2').closeModal();
	}
	
	make_qi(list_cnt++);
	
});
function CountChecked(field){
	if(field.checked)
		 totalChecked++;
	else
  	     totalChecked--;
	if(totalChecked > max_sel){
		alert("�ִ� " + max_sel + "�� ������ �����մϴ�.");
		field.checked = false;
		totalChecked --;
	}
}
