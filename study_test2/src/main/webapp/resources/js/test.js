
$(function(){
	initDatas();
	initEvents();
	initPrams();
	
});

function initDatas(){
	
}

function initPrams(){
		var cols = [
		{ header: '학번', name: 'IDX', align: 'center' }
	  , { header: '이름', name: 'NAME', align: 'center' }
      , { header: '과목 코드', name: 'CODE', align: 'center'}
      , { header: '점수', name: 'SCORE', align: 'center'}

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
	
}

var gf_Transaction = (id, url, httpMethod, params, datas, callback, statusCode) => {
	
  if( params != null ) {
	  params.sendaddr = paramTest( params );
  } 
	
  $.ajax({
    url: url,
    contentType: 'application/json; charset=utf-8',
    type: httpMethod,
    data: JSON.stringify(params),
    dataType: 'json',
    success: function(ret) {
    	if (callback != null) {
       		callback( id, ret );
    	}
        console.log("전송 성공");
    },
    statusCode: statusCode,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    	
        if( gv_ErrDisp == ERR_ALERT )
    		alert("오류가 발생하였습니다. 관리자에게 문의 바랍니다.");
    	else if( gv_ErrDisp == ERR_CONSOLE ) {
    		console.log("AJAX 오류 ===================");
    		console.log( textStatus );
			console.log( errorThrown );
    	}
    	else if( gv_ErrDisp == ERR_CALLBACK ) {
				var ret = { "result":"FAIL", "msg":textStatus };
				callback( id, ret );
			} 
        console.log("에러 발생");
    }
  });

  // header.jsp에 전역변수 설정
  // g_aDelay 톰캣서버 web.xml에 세션 타임아웃 시간
  // g_aTime 세션종료 예측 시간 = 현재시간 + 세션 타임아웃 시간
  // g_aTime = Date.now() + g_aDelay;

}


function f_callback(trId, ret){
	console.log("들어옴 .. . .");
	console.log(ret);
	if(ret.result == "FAIL" || ret.result ==="undefined"){
		alert("오류가 발생하였습니다.");
	}
	
	switch(trId){

		case "TEST" :
			break;
		default:
			break;
	}
}

