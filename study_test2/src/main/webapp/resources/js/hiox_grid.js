// 전역 변수
var grid = null;
let gridList=[];
let dataMap = new Map();
let pageData = new Map();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 기본 세팅 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(function(){
	initPrams();
	initDatas();
	initEvents();
});

function initDatas(){
	dataMap.clear();
	var data = { "page" : 1 };
	pageData.set("currentPage", 1);
	gf_Transaction_min("searchHiox", "/selectHiox", "POST", data, 1);
}

function initPrams(){
		var cols = [
		{ header: '선택', name: 'choose', align: 'center', sortable: true }
	  , { header: '입고일시', name: 'receive_date', align: 'center', sortable: true}
      , { header: '재질', name: 'texture', align: 'center', sortable: true}
      , { header: '두께', name: 'thickness', align: 'center', sortable: true }
	  , { header: '크기', name: 'size', align: 'center', sortable: true }	
	  , { header: '출고여부', name: 'release_a', align: 'center', sortable: true }
	  , { header: '출고일', name: 'release_date', align: 'center', sortable: true }
	];
	// # 그리드 생성
	grid = new tui.Grid({
	    el: document.getElementById("grid")
	    , scrollX: false
	    , scrollY: true
	    //, bodyHeight: 650
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
		update_Ready(el);
	});
	// ~~~~~~~~~~~~~~~~~~~~~~~~~ 버튼 클릭 이벤트  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$("#reset_btn").on("click",function(event){
		event.preventDefault();
		
		initDatas();
	});
	$("#search_btn").on("click",function(event){
		event.preventDefault();
		
		getURL();
		var data = Object.fromEntries(dataMap);
		pageData.set("currentPage", 1);
		gf_Transaction_min("searchHiox", "/selectHiox", "POST", data, 1);
	});
	// 페이지 버튼 클릭 이벤트
	$("#pagingArea").on("click",".page", function(){
		event.preventDefault();
		pageSetAndTrans(this.value);
	});
	// 첫번째 페이지로
	$("#firstPage").on("click",function(event){
		event.preventDefault();
		pageSetAndTrans(1);
	});
	// 이전 페이지 리스트
	$("#prevPageList").on("click",function(event){
		event.preventDefault();
		pageSetAndTrans(pageData.get("firstPage")-1)
	});
	// 다음 페이지 리스트
	$("#nextPageList").on("click",function(event){
		event.preventDefault();
		pageSetAndTrans(pageData.get("lastPage")+1)
	});
	// 마지막 페이지로
	$("#lastPage").on("click",function(event){
		event.preventDefault();
		pageSetAndTrans(99999999);
	});
	$("#release_btn").on("click",function(event){
		event.preventDefault();
		chooseList = [];
		grid.getCheckedRows().forEach(e => chooseList.push(e["choose"])); // 기본키로 바꿀것
		var queryString = {
			"Message" : chooseList,
			"release" : "release",
			"page" : pageData.get("currentPage")
			};
		gf_Transaction_min("releaseHiox", "/releaseHiox", "POST", queryString, 1);
	});
	$("#release_cancel_btn").on("click",function(event){
		event.preventDefault();
		chooseList = [];
		grid.getCheckedRows().forEach(e => chooseList.push(e["choose"])); // 기본키로 바꿀것
		var queryString = {
			"Message" : chooseList,
			"release" : "cancel",
			"page" : pageData.get("currentPage")
			};
		gf_Transaction_min("releaseHiox", "/releaseHiox", "POST", queryString, 1);
	});
	$("#delete_btn").on("click",function(event){
		event.preventDefault();
		
		chooseList = [];
		grid.getCheckedRows().forEach(e => chooseList.push(e["choose"])); // 기본키로 바꿀것
		var queryString = {
			"Message" : chooseList,
			"page" : pageData.get("currentPage")
			};
		
		gf_Transaction_min("delete", "/deleteHiox", "POST", queryString, 1);
	});
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 사용 함수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
(function($){
	$.fn.serializeObject = function () {
		"use strict";

		var result = {};
		var extend = function (i, element) {
			var node = result[element.name];

	// If node with same name exists already, need to convert it to an array as it
	// is a multi-value field (i.e., checkboxes)

			if ('undefined' !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push(element.value);
				} else {
					result[element.name] = [node, element.value];
				}
			} else {
				result[element.name] = element.value;
			}
		};

		$.each(this.serializeArray(), extend);
		return result;
	};
})(jQuery);
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
		case "searchHiox" :
			grid.resetData(data["SUCC"]);
			makeBtnList(data["pageList"]);
			break;
		case "releaseHiox" :
			pageSetAndTrans(pageData.get("currentPage"));
			break;
		case "delete" :
			pageSetAndTrans(pageData.get("currentPage"));
			break;
	}
}
// grid 더블클릭 이벤트로 들어온 객체 정보를 hidden 필드에 저장
function update_Ready(el) {
	$("#h_idx").val(el["IDX"]);
	$("#h_name").val(el["NAME"]);
	$("#h_code").val(el["CODE"]);
	$("#h_score").val(el["SCORE"]);
	
	window.open("/update_subView", "update_popup", "width = 500, height = 500");
}
// 검색 파라미터 편집
function getURL(data) {
	// Map 전역 변수에 키/값 설정
	if($("#start_date").val() !== "")
		dataMap.set("start_date", $("#start_date").val());
	else
		dataMap.delete("start_date");

	if($("#end_date").val() !== "")
		dataMap.set("end_date", $("#end_date").val());
	else
		dataMap.delete("end_date");
	
	if($("#texture").val() !== "---재질---")
		dataMap.set("texture", $("#texture").val());
	else
		dataMap.delete("texture");
	
	if($("#thickness").val() !== "---두께---")
		dataMap.set("thickness", $("#thickness").val());
	else
		dataMap.delete("thickness");
	
	if($("#size").val() !== "---크기유형---")
		dataMap.set("size", $("#size").val());
	else
		dataMap.delete("size");
	
	dataMap.set("page", 1);
}
// 화면에 버튼 목록 만듬
function makeBtnList(data) {
	// 전역 맵 변수에 값 저장
	pageData.set("firstPage", data[0]);
	pageData.set("lastPage", data[1]);
	// 기존에 존재하던 버튼 목록 지움
	var btnlist = document.getElementsByClassName("page");
	var len = btnlist.length;
		
	for(var i = 0; i < len; i++) {
		btnlist[0].parentNode.removeChild(btnlist[0]);
	}
	// 화면에 버튼 목록 새로 만듬
	var pagingArea = document.getElementById('pagingArea');
	var btn;
	var text;
	
	for(var i = data[0]; i <= data[1]; i++) {
		btn = document.createElement('button');
		text = document.createTextNode(String(i));
		btn.className = "page";
		btn.value = String(i);
		btn.appendChild(text);
		pagingArea.appendChild(btn);
	}
}
function pageSetAndTrans(page) {
	pageData.set("currentPage", page);
	dataMap.set("page", page);
	var data = Object.fromEntries(dataMap);
	gf_Transaction_min("searchHiox", "/selectHiox", "POST", data, 1);
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 외적 편의 함수 ~~~~~~~~~~~~~~~~~~~~~~~~~~
function listMapToJson(list) {
	let csv_str = "";
	csv_str += "idx,name,code,score\n";
	list.forEach(data => {
		csv_str += data["idx"];
		csv_str += ",";
		csv_str += data["name"];
		csv_str += ",";
		csv_str += data["code"];
		csv_str += ",";
		csv_str += data["score"];
		csv_str += "\n";
	})
	return csv_str;
}