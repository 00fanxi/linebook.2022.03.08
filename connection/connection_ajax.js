$('.center_this').change(function(e){
	var nodename = e.target.value;

	$.ajax({
		method : 'post',
		url : '/connect/thisnode',
		data : {nodename : nodename}
	}).done(function(result){
    var json = JSON.parse(result);
    var oppnodelist = json.oppnodelist;
    var option = `<option selected></option>`;
    for(var i in oppnodelist){
      option += `<option value = "${oppnodelist[i]}" class="${oppnodelist[i]}">${oppnodelist[i]}</option>`;
    }

    document.querySelector('#east_opp').innerHTML = option;
    document.querySelector('#west_opp').innerHTML = option;

  }).fail(function(xhr,textStatus,errorThrown){
    console.log(xhr,textStatus,errorThrown);
  });
});




$('.opps').change(function(e){
	var oppnodename = e.target.value;
  var which_side = e.target.id;
  var opp_side;
  var which_name;
  var opp_name;
  if(which_side === "west_opp"){
    opp_side = "east_opp";
    which_name = "west_name";
    opp_name = "east_name";
  }else{
    opp_side = "west_opp";
    which_name = "east_name";
    opp_name = "west_name";
  }
  var nodename = document.querySelector('.center_this').value;
	$.ajax({
		method : 'post',
		url : '/connect/oppnode',
		data : {nodename : nodename, oppnodename : oppnodename}
	}).done(function(result){

    var json = JSON.parse(result);
    var portnamelist = json.portnamelist;
    var option = `<option selected></option>`;
    //이미 선택되어 있는 반대노드나 지금 선택된 반대노드를 동서 양쪽의 리스트에서 하나씩 뺀다.
    var which_options = $(`#${which_side}`).children();
    var opp_options = $(`#${opp_side}`).children();
    for(var i = 0;i<which_options.length;i++){
      which_options[i].style.display = "inline";
      opp_options[i].style.display = "inline";
    }

    var which_value = document.querySelector(`#${which_side}`).value;
    var opp_value = document.querySelector(`#${opp_side}`).value;

    if(which_value === opp_value && which_value != ""){
      var same_which = document.querySelectorAll(`#${which_side} .${which_value}`);
      var same_opp = document.querySelectorAll(`#${opp_side} .${which_value}`);
      for(var i = 0;i<2;i++){
        same_which[i].style.display = "none";
        same_opp[i].style.display = "none";
      }
    }else if(which_value != opp_value){
      if(which_value != ""){
        document.querySelector(`#${which_side} .${which_value}`).style.display = "none";
        document.querySelector(`#${opp_side} .${which_value}`).style.display = "none";
      }
      if(opp_value != ""){
        document.querySelector(`#${opp_side} .${opp_value}`).style.display = "none";
        document.querySelector(`#${which_side} .${opp_value}`).style.display = "none";
      }
    }
    ////////////////////////////////////////////
    //변경된 사이드에 portnamelist 제공, 만약 반대 사이드에 노드가 같고 이미 포트 이름이 선택되어 있다면 그 이름을 리스트에서 none으로
    for(var i in portnamelist){
      if(which_value === opp_value && document.querySelector(`#${opp_name}`).value != "" && document.querySelector(`#${opp_name}`).value === portnamelist[i]){
        option += `<option value = "${portnamelist[i]}" class="${portnamelist[i]}" style="display:none;">${portnamelist[i]}</option>`;
      }else{
        option += `<option value = "${portnamelist[i]}" class="${portnamelist[i]}">${portnamelist[i]}</option>`;
      }
    }
    if(which_side === "west_opp"){
      document.querySelector('#west_name').innerHTML = option;
    }else if(which_side === "east_opp"){
      document.querySelector('#east_name').innerHTML = option;
    }

  }).fail(function(xhr,textStatus,errorThrown){
    console.log(xhr,textStatus,errorThrown);
  });
});




$('.names').change(function(e){
	var nodename = document.querySelector('.center_this').value;
  var which_side = e.target.id;
  var opp_side;
  var which_opp;
  var opp_opp;
  var which_port;

  if(which_side === "west_name"){
    opp_side = "east_name";
    which_opp = "west_opp";
    opp_opp = "east_opp";
    which_port = "west_port";
		which_data = "w_connect_data";
  }else{
    opp_side = "west_name";
    which_opp = "east_opp";
    opp_opp = "west_opp";
    which_port = "east_port";
		which_data = "e_connect_data";
  }

  var oppnodename = document.querySelector(`#${which_opp}`).value;

  var portname = e.target.value;

	$.ajax({
		method : 'post',
		url : '/connect/portname',
		data : {nodename : nodename,oppnodename : oppnodename, portname : portname}
	}).done(function(result){
		result = JSON.parse(result);
		var port = result.port;
		var connect_data = JSON.stringify(result.connect_data);
    document.querySelector(`.${which_port}`).innerHTML = port;
		document.querySelector(`.${which_data}`).value = connect_data;
		// // background 반영
		// var portnumber = JSON.parse(document.querySelector(`.${which_port} .spread`).dataset.id).portnumber;
		// var connect_json = result.connect_data;


    //선택된 포트이름을 리스트에서 뺀다
    var which_options = $(`#${which_side}`).children();
    var opp_options = $(`#${opp_side}`).children();
    for(var i = 0;i<which_options.length;i++){
      which_options[i].style.display = "inline";
    }
    for(var i = 0;i<opp_options.length;i++){
      opp_options[i].style.display = "inline";
    }
    var which_value = document.querySelector(`#${which_side}`).value;
    var opp_value = document.querySelector(`#${opp_side}`).value;

    which_opp = document.querySelector(`#${which_opp}`).value;
    opp_opp = document.querySelector(`#${opp_opp}`).value;
    //둘이 같고 ""가 아닐경우, 둘이 같고 ""일 경우, 둘이 다르고 하나는 ""일 경, 둘이 다르고 둘다 ""이 아닐경우
    if(which_value === opp_value && which_value != "" && opp_opp === which_opp){
      var same_which = document.querySelectorAll(`#${which_side} .${which_value}`);
      var same_opp = document.querySelectorAll(`#${opp_side} .${which_value}`);
      for(var i = 0;i<2;i++){
        same_which[i].style.display = "none";
        same_opp[i].style.display = "none";
      }
    }else if(which_value != opp_value && opp_opp != "" && opp_opp === which_opp){
      if(which_value != ""){
        document.querySelector(`#${which_side} .${which_value}`).style.display = "none";
        document.querySelector(`#${opp_side} .${which_value}`).style.display = "none";
      }
      if(opp_value != ""){
        document.querySelector(`#${opp_side} .${opp_value}`).style.display = "none";
        document.querySelector(`#${which_side} .${opp_value}`).style.display = "none";
      }
    }else if(which_value != opp_value && opp_opp != "" && which_opp === ""){
      if(opp_value != ""){
        document.querySelector(`#${opp_side} .${opp_value}`).style.display = "none";
      }
    }else if(which_value != opp_value && opp_opp === "" && which_opp != ""){
      if(which_value != ""){
        document.querySelector(`#${which_side} .${which_value}`).style.display = "none";
      }
    }

  }).fail(function(xhr,textStatus,errorThrown){
    console.log(xhr,textStatus,errorThrown);
  });
});




$('.connecting').click(function(e){
	var west_point_number = document.querySelectorAll('.west_port #Sel');
  var east_point_number = document.querySelectorAll('.east_port #Sel');

	var w_connect_data = JSON.parse(document.querySelector('.w_connect_data').value);
	var e_connect_data = JSON.parse(document.querySelector('.e_connect_data').value);

  if(west_point_number.length != 1 || east_point_number.length != 1){
 	  alert('연결을 하시려면 각 단자에서 포트를 하나씩 선택하셔야 합니다.');
  }else if(west_point_number.length === 1 && east_point_number.length === 1){

		var west_JSON = document.querySelector(`.west_port #Sel`).dataset.id;
		var east_JSON = document.querySelector(`.east_port #Sel`).dataset.id;

		west_json = JSON.parse(west_JSON);
		east_json = JSON.parse(east_JSON);

		var w_sharenum = west_json.sharenum;
		var w_num = west_json.num;
		var w_oppnodename = west_json.oppnodename;
		var w_portname = west_json.portname;

		var e_sharenum = east_json.sharenum;
		var e_num = east_json.num;
		var e_oppnodename = east_json.oppnodename;
		var e_portname = east_json.portname;

		if(
			w_connect_data[w_num].some(function(element){
				if(element.sharenum === east_json.sharenum && element.num === east_json.num){
					return true;
				}
			})
		){
			alert('이미 서로 연결되어 있는 포트 입니다.');
		}else{
			$.ajax({
				method : 'post',
				url : '/connect/connecting',
				data : {west_json : west_JSON, east_json : east_JSON}
			}).done(function(result){

		    var json = JSON.parse(result);
				var w_connect_data = json.w_connect_data;
				var e_connect_data = json.e_connect_data;

				if(w_connect_data[w_num].length === 1){
					document.querySelector('.west_port #Sel').style.background = "green";
					var w_title1 = `<현재 연결되어있는 단자>
${w_connect_data[w_num][0].oppnodename}로 가는 ${w_connect_data[w_num][0].portname}의 ${w_connect_data[w_num][0].num}번 포트`;
					document.querySelector('.west_port #Sel').title = w_title1;
					document.querySelector('.west_port #Sel').id = "nUm";
				}else if(w_connect_data[w_num].length > 1){
					document.querySelector('.west_port #Sel').style.background = "orange";
					var w_title2 = `<현재 연결되어있는 단자>
[상태 : 브릿지]
[브릿지 수 : ${w_connect_data[w_num].length}]`;
					var j;
					for(var i in w_connect_data[w_num]){
						w_title2 += `
${parseInt(i)+1}. ${w_connect_data[w_num][i].oppnodename}로 가는 ${w_connect_data[w_num][i].portname}의 ${w_connect_data[w_num][i].num}번 포트`;
					}
					document.querySelector('.west_port #Sel').title = w_title2;
					document.querySelector('.west_port #Sel').id = "nUm";
				}

				if(e_connect_data[e_num].length === 1){
					document.querySelector('.east_port #Sel').style.background = "green";
					var e_title1 = `<현재 연결되어있는 단자>
${e_connect_data[e_num][0].oppnodename}로 가는 ${e_connect_data[e_num][0].portname}의 ${e_connect_data[e_num][0].num}번 포트`;
					document.querySelector('.east_port #Sel').title = e_title1;
					document.querySelector('.east_port #Sel').id = "nUm";
				}else if(e_connect_data[e_num].length > 1){
					document.querySelector('.east_port #Sel').style.background = "orange";
					var e_title2 = `<현재 연결되어있는 단자>
[상태 : 브릿지]
[브릿지 수 : ${e_connect_data[e_num].length}]`;
					for(var i in e_connect_data[e_num]){
						e_title2 += `
${parseInt(i)+1}. ${e_connect_data[e_num][i].oppnodename}로 가는 ${e_connect_data[e_num][i].portname}의 ${e_connect_data[e_num][i].num}번 포트`;
					}
					document.querySelector('.east_port #Sel').title = e_title2;
					document.querySelector('.east_port #Sel').id = "nUm";
				}

				document.querySelector('.w_connect_data').value = JSON.stringify(w_connect_data);
				document.querySelector('.e_connect_data').value = JSON.stringify(e_connect_data);

		  }).fail(function(xhr,textStatus,errorThrown){
		    console.log(xhr,textStatus,errorThrown);
		  });
		}
  }
});
