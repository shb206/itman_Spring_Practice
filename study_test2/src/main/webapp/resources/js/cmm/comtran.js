const ERR_NONE = "NONE";
const ERR_CONSOLE = "CONSOLE";
const ERR_ALERT = "ALERT";
const ERR_CALLBACK = "CALLBACK";
var gv_ErrDisp = ERR_CALLBACK;


(function($){
  $.fn.serializeObject = function () {
    "use strict";

    var result = {};
    var extend = function (i, element) {
      var node = result[element.name];

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

var gf_Transaction = (id, url, httpMethod, params, datas, callback, statusCode) => {

  if( params != null ) {
	  //params.sendaddr = paramTest( params );
  }
	console.log(params)
  $.ajax({
    url: url,
    contentType: 'application/json; charset=utf-8',
    type: httpMethod,
    data: JSON.stringify(params),
 	//data: params,
    dataType: 'json',
    success: function(ret) {
    	if (callback != null) {
       		callback( id, ret );
    	}
    },
    statusCode: statusCode,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
		console.log(XMLHttpRequest);
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
    }
  });

  // header.jsp에 전역변수 설정
  // g_aDelay 톰캣서버 web.xml에 세션 타임아웃 시간
  // g_aTime 세션종료 예측 시간 = 현재시간 + 세션 타임아웃 시간
  // g_aTime = Date.now() + g_aDelay;

}

var gf_Transaction2 = (id, url, httpMethod, params, datas, callback, statusCode) => {
	  if( params != null ) {
		  params.sendaddr = paramTest( params );;
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
	    }
	  });
}

var gf_ExcelDown = ( infos, cols ) => {
	var ifrm = document.createElement( "iframe" );	// iframe 태그 생성
	var frm = document.createElement( "form" );		// submit 위한 form 태그 생성
	var inp;

	$( ifrm ).css( "display", "none" );				// iframe 을 감춘다.
	$("body").append( ifrm );						// body 태그 내에 붙인다.
	
	ifrm.contentWindow.document.open();				// iframe 안에 body 태그를 넣는다.
	ifrm.contentWindow.document.write("<body>&bsp;</body>");
	ifrm.contentWindow.document.close();
	
	inp = document.createElement( "input" );	// input 태그를 만들어서 infos JSON
												// 데이터를 문자열로 만들어서 넣는다.
	$( frm ).append( inp );						// 만든 input 태그를 form 태그 안에 넣는다.
	frm.action = "/com/itman/excel/download";
	inp.type = "hidden";
	inp.name = "infos";
	inp.value = JSON.stringify(infos);
	
	inp = document.createElement( "input" );	// input 태그를 만들어서 컬럼 정보를 문자열로
												// 넣는다.
	$( frm ).append( inp );
	inp.type = "hidden";
	inp.name = "cols";
	inp.value = JSON.stringify(cols);
	
	$( ifrm ).contents().find('html').append( frm ); // 만든 form 태그를 iframe 안에
														// 집어넣는다.
	frm.submit();									// form submit 실행 -> java 로
													// 가서 엑셀 다운로드가 진행
	
	setTimeout( function() {	// 5 초 후 iframe 삭제
		$( ifrm ).detach();
	}, 5000 );
	
	// $( ifrm ).detach();
}

var gf_ExcelDownJson = ( infos, cols, datas ) => {
	var ifrm = document.createElement( "iframe" );	// iframe 태그 생성
	var frm = document.createElement( "form" );		// submit 위한 form 태그 생성
	var inp;

	$( ifrm ).css( "display", "none" );				// iframe 을 감춘다.
	$("body").append( ifrm );						// body 태그 내에 붙인다.
	
	ifrm.contentWindow.document.open();				// iframe 안에 body 태그를 넣는다.
	ifrm.contentWindow.document.write("<body>&bsp;</body>");
	ifrm.contentWindow.document.close();
	
	inp = document.createElement( "input" );	// input 태그를 만들어서 infos JSON
												// 데이터를 문자열로 만들어서 넣는다.
	$( frm ).append( inp );						// 만든 input 태그를 form 태그 안에 넣는다.
	frm.action = "/com/itman/excel/downloadJson";
	inp.type = "hidden";
	inp.name = "infos";
	inp.value = JSON.stringify(infos);
	
	inp = document.createElement( "input" );	// input 태그를 만들어서 컬럼 정보를 문자열로
												// 넣는다.
	$( frm ).append( inp );
	inp.type = "hidden";
	inp.name = "cols";
	inp.value = JSON.stringify(cols);

	inp = document.createElement( "input" );	// input 태그를 만들어서 데이터 목록을 문자열로
												// 넣는다.
	$( frm ).append( inp );
	inp.type = "hidden";
	inp.name = "datas";
	inp.value = JSON.stringify(datas);
	
	$( ifrm ).contents().find('html').append( frm ); // 만든 form 태그를 iframe 안에
														// 집어넣는다.
	frm.submit();									// form submit 실행 -> java 로
													// 가서 엑셀 다운로드가 진행
	
	setTimeout( function() {	// 5 초 후 iframe 삭제
		$( ifrm ).detach();
	}, 5000 );
}
var gf_ExcelDownJsonPost = ( infos, cols, datas ) => {
	var ifrm = document.createElement( "iframe" );	// iframe 태그 생성
	var frm = document.createElement( "form" );		// submit 위한 form 태그 생성
	var inp;

	$( ifrm ).css( "display", "none" );				// iframe 을 감춘다.
	$("body").append( ifrm );						// body 태그 내에 붙인다.
	
	ifrm.contentWindow.document.open();				// iframe 안에 body 태그를 넣는다.
	ifrm.contentWindow.document.write("<body>&bsp;</body>");
	ifrm.contentWindow.document.close();
	
	inp = document.createElement( "input" );	// input 태그를 만들어서 infos JSON
												// 데이터를 문자열로 만들어서 넣는다.
	$( frm ).append( inp );			
	// 만든 input 태그를 form 태그 안에 넣는다.
	frm.action = "/com/itman/excel/downloadJsonPost";
	frm.method = "POST";
	inp.type = "hidden";
	inp.name = "infos";
	inp.value = JSON.stringify(infos);
	
	inp = document.createElement( "input" );	// input 태그를 만들어서 컬럼 정보를 문자열로
												// 넣는다.
	$( frm ).append( inp );
	inp.type = "hidden";
	inp.name = "cols";
	inp.value = JSON.stringify(cols);

	inp = document.createElement( "input" );	// input 태그를 만들어서 데이터 목록을 문자열로
												// 넣는다.
	$( frm ).append( inp );
	inp.type = "hidden";
	inp.name = "datas";
	inp.value = JSON.stringify(datas);
	
	$( ifrm ).contents().find('html').append( frm ); // 만든 form 태그를 iframe 안에
														// 집어넣는다.
	frm.submit();									// form submit 실행 -> java 로
													// 가서 엑셀 다운로드가 진행
	
	setTimeout( function() {	// 5 초 후 iframe 삭제
		$( ifrm ).detach();
	}, 5000 );
}

var gf_ExcelDownURL = ( url, params ) => {
	var ifrm = document.createElement( "iframe" );	// iframe 태그 생성
	var frm = document.createElement( "form" );		// submit 위한 form 태그 생성
	var inp;

	$( ifrm ).css( "display", "none" );				// iframe 을 감춘다.
	$("body").append( ifrm );						// body 태그 내에 붙인다.
	
	ifrm.contentWindow.document.open();				// iframe 안에 body 태그를 넣는다.
	ifrm.contentWindow.document.write("<body>&bsp;</body>");
	ifrm.contentWindow.document.close();
	
	inp = document.createElement( "input" );	// input 태그를 만들어서 infos JSON
												// 데이터를 문자열로 만들어서 넣는다.
	$( frm ).append( inp );						// 만든 input 태그를 form 태그 안에 넣는다.
	frm.action = url;
	frm.method = "POST";
	inp.type = "hidden";
	inp.name = "params";
	inp.value = JSON.stringify(params);

	inp = document.createElement( "input" );	// input 태그를 만들어서 컬럼 정보를 문자열로
												// 넣는다.
	$( frm ).append( inp );
	inp.type = "hidden";
	inp.name = "cols";
	inp.value = JSON.stringify(cols);
	
	$( ifrm ).contents().find('html').append( frm ); // 만든 form 태그를 iframe 안에
														// 집어넣는다.
	frm.submit();									// form submit 실행 -> java 로
													// 가서 엑셀 다운로드가 진행
	
	setTimeout( function() {	// 5 초 후 iframe 삭제
		$( ifrm ).detach();
	}, 5000 );
}

var g_listSit = null;
var g_callbackOut = null;

function gf_selectSitInf(callback)
{
	if( typeof(callback) != "undefined" && callback != null )
		g_callbackOut = callback;
	gf_Transaction( "EMS_SIT_INF", "/ems/main/selectSitInf", "GET", null, null, gf_callbackSitInf );
}

function gf_callbackSitInf(id, ret)
{
	var i;
		
	g_listSit = ret.listSit;
	for( i=0; i<g_listSit.length; i++ ) {
		$("#sitNm"+g_listSit[i]["mno"]).val(g_listSit[i]["sitNm"]);
		$("#sitNm"+g_listSit[i]["mno"]).html(g_listSit[i]["sitNm"]);
		$("#menuSitNm"+g_listSit[i]["mno"]).html(g_listSit[i]["sitNm"]);
	}
	if( g_callbackOut != null )
		g_callbackOut( ret );
}

function paramTest( params ) {
	var keys = Object.keys( params );
	var i, j, m;
	
	for( i=0; i<keys.length-1; i++) {
		m = i;
		for( j=i+1; j<keys.length; j++ ) {
			if( keys[m]>keys[j] )
				m = j;
		}
		if( m != i ) {
			var tmp = keys[i];
			keys[i] = keys[m];
			keys[m] = tmp;
		}
	}
	
	

	// console.log("key = "+s);
	// console.log("enc = "+enc);
	return enc;
}

