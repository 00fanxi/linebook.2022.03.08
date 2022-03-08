$('.ref').change(function(e){
	var nodename = document.querySelector('title').innerText;
	var json = JSON.parse(e.target.dataset.id);
	var num = parseInt(json.num);
	var _id = parseInt(json._id);
	$.ajax({
		method : 'PUT',
		url : '/save/refer',
		data : {_id : _id, nodename : nodename, num : num, content : e.target.value}
	});
});

$('.usage').change(function(e){
	var nodename = document.querySelector('title').innerText;
	var json = JSON.parse(e.target.dataset.id);
	var num = parseInt(json.num);
	var _id = parseInt(json._id);
	$.ajax({
		method : 'PUT',
		url : '/save/usage',
		data : {_id : _id, nodename : nodename, num : num, content : e.target.value}
	});
});

$('.set_disable_button').click(function(e){
	var nodename = document.querySelector('title').innerText;
	var json = JSON.parse(e.target.dataset.id);
	var sharenum = e.target.id;
	var num = document.querySelector(`#p${sharenum} .set_disable_select`).value;
	var _id = parseInt(json._id);
	$.ajax({
		method : 'PUT',
		url : '/save/disable',
		data : {_id : _id, nodename : nodename, num : num}
	});
});

$('.remove_disable_button').click(function(e){
	var nodename = document.querySelector('title').innerText;
	var json = JSON.parse(e.target.dataset.id);
	var _id = parseInt(json._id);
	var sharenum = e.target.id;
	var num = document.querySelector(`#p${sharenum} .remove_disable_select`).value;

	$.ajax({
		method : 'PUT',
		url : '/save/available',
		data : {_id : _id, nodename : nodename, num : num}
	});
});
