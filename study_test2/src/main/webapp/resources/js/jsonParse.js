// 전역 변수
var grid = null;
let gridList=[];
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 기본 세팅 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(function(){
	initPrams();
	initDatas();
	initEvents();
});

// 전체 리스트 표시
function tui_showInfo() {
	var queryString = {"Message" : "showInfo"};
	gf_Transaction_min("show_info", "/selectJsonAll", "POST", queryString, 1)
}

function initDatas(){
	tui_showInfo();
}

function initPrams(){
		/*
		**********************
		오픈 데이터 상세
		https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=3068728
		**********************
		*/
		var cols = [
		{ header: '충전기 ID', name: 'cpId', align: 'center', sortable: true }
	  	, { header: '충전소 ID', name: 'csId', align: 'center', sortable: true}
      	, { header: '충전소 명칭', name: 'csNm', align: 'center', sortable: true}
      	, { header: '충전기 명칭', name: 'cpNm', align: 'center', sortable: true }
		, { header: '충전기 타입', name: 'chargeTp', align: 'center', sortable: true }
		, { header: '충전기 주소', name: 'addr', align: 'center', sortable: true }
	];
	// # 그리드 생성
	grid = new tui.Grid({
	    el: document.getElementById("grid")
	    , scrollX: false
	    , scrollY: true
	    , bodyHeight: 650
		, rowHeaders: ['checkbox','rowNum']
	    //, selectionUnit: "row"
	    , columns: cols
	});
	
}

function initEvents(){
	// ### grid event ###
	// # 클릭 이벤트
	grid.on('focusChange', (e) =>{
		grid.setSelectionRange({
			  start:[e.rowKey, 0]
			, end:[e.rowKey, grid.getColumns().length]
		});
	});
	// # 더블 클릭 이벤트
	grid.on('dblclick', (e) =>{
		var el = grid.getRow(e.rowKey);
		//update_Ready(el);
	});
	
	// # 체크박스 체크
	grid.on('check', function(e){
		grid.setSelectionRange({
			  start:[e.rowKey, 0]
			, end:[e.rowKey, grid.getColumns().length]
		});
		gridList.push(grid.getRow(e.rowKey));
	});
	
	// # 체크박스 체크 해제
	grid.on("uncheck", function(e){
		grid.getRow(e.rowKey);
		
		// 체크 해제한 항목을 체크 리스트에서 삭제
		Array.from(gridList).forEach(li => {
		    if(li["rowKey"] === e.rowKey) {
			    var idx = gridList.indexOf(li);
			    if(idx > -1) {
				    gridList.splice(idx, 1);
			    }
		    }})
	});
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 사용 함수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ajax 통신 함수
var gf_Transaction_min = (id, url, httpMethod, params, callback) => {
	$.ajax({
		url: url,
		type: httpMethod,    
		data: JSON.stringify(params),
		contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
	    success: function(ret) {
	    	if (callback != null) {
	       		f_callback( id, ret );
	    	}
	    	console.log("전송 성공");
	    },
	    error:function(request, status, error) {
	    	alert(request.status + " : " +status.dataType+"/");
	    }
	});
}
function f_callback(trId, data){
	
	if(data["FAIL"]) {
		alert(data["FAIL"]);
	}
	
	switch(trId) {
		case "show_info" :
			grid.resetData(data["SUCC"]);
		case "selectPop" :
			grid.resetData(data["SUCC"]);
			break;
		case "insertJson" :
			console.log(data["SUCC"]);
			tui_showInfo();
			break;
		case "updatePop" :
			tui_showInfo();
			break;
		case "delete" :
			console.log("데이터 체크 : " + data["SUCC"])
			tui_showInfo();
	}
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 버튼 이벤트 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(document).ready(function() {
	$("#reset_btn").on("click",function(event){
		event.preventDefault();
		tui_showInfo();
	});
	$("#insert_btn").on("click",function(event){
		if(!$("#start").val()) { $("#start").val(1) }
		if(!$("#end").val()) { $("#end").val($("#start").val()) }
		if(!$("#perPage").val()) { $("#perPage").val(10) }
			
			
		let data = {
			"start" : $("#start").val(),
			"end" : $("#end").val(),
			"perPage" : $("#perPage").val() }
		gf_Transaction_min("insertJson", "/insertJson", "POST", data, 1);
	});
	$("#delete_btn").on("click",function(event){
		event.preventDefault();
		// 체크를 하나도 안했을 경우
		if(gridList.length === 0)
			alert("하나 이상의 학생을 체크해주세요");
        
		// 체크리스트(griList)의 값을 index list로 변경
		cpIdList = [];
		gridList.forEach(e => cpIdList.push(e["cpId"]));
		var queryString = {"Message" : cpIdList};
		//console.log(queryString);
		gf_Transaction_min("delete", "/deleteJson", "POST", queryString, 1);
	});
})
