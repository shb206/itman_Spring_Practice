const EMPTY_ALL = "ALL";
const EMPTY_NONE = "NONE";

var m_dlg = null;
var m_mask = null;

var gf_PostOpen = ( url, options, params, callback, maskOn ) => {

	// header.jsp에 전역변수 설정
	// g_aDelay 톰캣서버 web.xml에 세션 타임아웃 시간
	// g_aTime 세션종료 예측 시간 = 현재시간  + 세션 타임아웃 시간
	g_aTime = Date.now() + g_aDelay;

	var nm = "dlg_" + $.now();
	// 팝업을 가운데로 
	var obj = eval("({"+options.replace(/=/gi,":")+"})");
	if( gf_IsNull(obj.left) && gf_IsNull(obj.right) ) {
		if( ! gf_IsNull(obj.width) && ! gf_IsNull(obj.height ) ) {
			var left = (screen.width- obj.width) / 2;
			var top = (screen.height- obj.height) / 2;
			options += ",left="+left+",top="+top;
		}
	}
	
	m_dlg = window.open("", nm, options );
	g_aPopWin.push(m_dlg);
	
	var frm = document.createElement( "form" );
	var inp = document.createElement( "input" );
	
	$( frm ).append( inp );
	inp.type = "hidden";
	inp.name = "params";
	inp.value = JSON.stringify(params);
	
	$("body").append( frm );
	frm.action = url;
	frm.target = nm;
	frm.method = "post";
	frm.submit();
	
	$( frm ).detach();
	
	if( maskOn ) 
		gf_MaskOn();
	
	return m_dlg;
}

var gf_MaskOn = () => {	
	m_mask = document.createElement( "div" );
	m_mask.id = "mask";
	$( m_mask ).css({ 
		"position": "absolute"  
		, "left": 0
		, "top": 0
		, "z-index": 999999  
		, "background-color": "rgba(0,0,0,0.5)"  
		, "width": $(window).width()
		, "height": $(document).height()
	});
	$("body").append( m_mask );
	$( m_mask ).fadeIn("slow");      
    //$( m_mask ).fadeIn("slow",0.4);

	// wait mask
	//var img = document.createElement("img");
	//img.src = "/resources/images/wait.gif";
	//console.log( window.innerWidth );
	//$(img).css( {"width":64, "height":64, "position":"absolute", "left":window.innerWidth / 2 - 32, "top":window.innerHeight / 2 - 32 } );
	//$(m_mask).append( img );
	
    var timer = setInterval(function() {   
        if(m_dlg.closed) {  
            clearInterval(timer);
        	$( m_mask ).detach();
        }  
    }, 500 ); 
}

//wait 이미지 보이기
var gf_MaskOnLoading = () => {	
	m_mask = document.createElement( "div" );
	m_mask.id = "mask";
	$( m_mask ).css({ 
		"position": "absolute"  
		, "left": 0
		, "top": 0
		, "z-index": 999999  
		, "background-color": "rgba(0,0,0,0.5)"  
		, "width": $(window).width()
		, "height": $(document).height()
	});
	$("body").append( m_mask );
	$( m_mask ).fadeIn("slow");      

	// wait mask
	var img = document.createElement("img");
	img.src = "/resources/images/wait.gif";
	$(img).css( {"width":64, "height":64, "position":"absolute", "left":window.innerWidth / 2 - 32, "top":window.innerHeight / 2 - 32 } );
	$(m_mask).append( img );
}

//wait 이미지 닫기
var gf_MaskOffLoading = () => {	
	$( m_mask ).detach();
}

var gf_IsNull = ( arg ) => {
	if( typeof(arg) == undefined ) return true;
	if( arg == null || arg == "" ) return true;
	
	return false;
}

var gf_NullToEmpty = ( arg ) => {
	if( gf_IsNull(arg) || arg == "null" ) return "";
	return arg;
}

var gf_DispInfo = ( info ) => {
	for(var key in info) {
		$("#"+key).html( info[key] );	
	}
}

var gf_DispInfo2 = ( info ) => {
	for(var key in info) {
		$("#"+key).html( gf_Comma( info[key] ) );	
	}
}

var gf_SetInfo = ( info ) => {
	for(var key in info) {
		$("#"+key).val( info[key] );	
	}
}

var gf_SetReadOnly = ( info ) => {
	for(var key in info) {
		$("#"+key).attr( 'readonly', true );	
		//$("#"+key).attr( 'Style', "background-color: #e2e2e2;" );	
	}
}

const gf_SetInfoByName = (info) => {
	Object.keys(info).forEach(key => {
		$('[name=${key}]').val(info[key]);
	});
}

// # Select 태그 Option 값 설정
var gf_SetCombo = ( id, list, emptyOptions, defVal, customFilter ) => {
	var i, map, cob, opt;
	var empDef = null;

	if( list == null  ) return;
	
	cob = $("#"+id);
	cob.html("");

	if( ! gf_IsNull(emptyOptions) ) {
		opt = document.createElement( "option" );		// <option></option>
		$( opt ).val( "" );								// <option value=""></option>
		if( emptyOptions == EMPTY_ALL )
			$( opt ).append( "전체" );					// <option value="">전체</option>
		cob.append( opt );								// <select> 태그에 추가
	}
	
	for( i=0; i<list.length; i++ ) {					// 컨트롤러가 보내준 목록의 개수만큼 반복
		map = list[i];									// 한개 가지고 옴
		if( gf_IsNull(customFilter) || customFilter( map ) ) {
			if( gf_IsNull(empDef) ) empDef = map.commCd;
			opt = document.createElement( "option" );		// <option></option>
			$( opt ).val( map.commCd );						// <option value="commCd값"></option>
			$( opt ).append( map.commCdNm );				// <option value="commCd값">commCdNm값</option>
			cob.append( opt );								// 만들어진 option 태그를 select 태그에 추가
		}
	}
	
	if( ! gf_IsNull(defVal) )							// 기본값을 전달 받으면
		cob.val( defVal );								// 그 기본값을 기본 선택값으로 한다.
	else if( gf_IsNull(emptyOptions) && list.length > 0 ) // 
		cob.val( empDef );						// 최초 항목을 기본값으로 선택
} 

var gf_SetComboCustom = ( id, list, valNm, txtNm, emptyOptions, defVal, customFilter ) => {
	var i, map, cob, opt;
	var empDef = null;

	if( list == null  ) return;
	
	cob = $("#"+id);
	cob.html("");

	if( ! gf_IsNull(emptyOptions) ) {
		opt = document.createElement( "option" );		// <option></option>
		$( opt ).val( "" );								// <option value=""></option>
		if( emptyOptions == EMPTY_ALL )
			$( opt ).append( "전체" );					// <option value="">전체</option>
		cob.append( opt );								// <select> 태그에 추가
	}
	
	for( i=0; i<list.length; i++ ) {					// 컨트롤러가 보내준 목록의 개수만큼 반복
		map = list[i];									// 한개 가지고 옴
		if( gf_IsNull(customFilter) || customFilter( map ) ) {
			if( gf_IsNull(empDef) ) empDef = map[valNm];
			opt = document.createElement( "option" );		// <option></option>
			$( opt ).val( map[valNm] );						// <option value="commCd값"></option>
			$( opt ).append( map[txtNm] );				// <option value="commCd값">commCdNm값</option>
			cob.append( opt );								// 만들어진 option 태그를 select 태그에 추가
		}
	}
	
	if( ! gf_IsNull(defVal) )							// 기본값을 전달 받으면
		cob.val( defVal );								// 그 기본값을 기본 선택값으로 한다.
	else if( gf_IsNull(emptyOptions) && list.length > 0 ) // 
		cob.val( empDef );						// 최초 항목을 기본값으로 선택
}

// combo 박스 value 여러개 담기
var gf_SetComboCustomMultiVal = (id, list, valNmList, txtNm, emptyOptions, defVal, customerFilter) => {
	var i, map, cob, opt;
	var empDef = null;
	
	if(list == null) return;
	
	cob = $("#"+id)
	cob.html("");
}


//# EMS 그리드 변경 / 디자이너 확인 toast ui 버젼 4.*
function gf_setEMSGridDesign() {
	var Grid = tui.Grid;
	Grid.applyTheme('dark',{
		grid: {
			background: '#525a66',
			border: '#525a66',
			text: '#fff'
		},
		selection: {
			background: '#0f0',
			border: '#0f0'
		},
		scrollbar: {
			emptySpace: '#8b9097',
			background: '#8b9097',
			border: '#8b9097',
			thumb: '#b8bec5',
			active: '#fff'
		},
		outline: { //테이블 전체 border
			border: '#525a66'
		},
		area:{
			header: {
				background: '#525a66'
			},
			body: {
				background: '#8b9097'
			}
		},
		row: {
			hover:{
				background: '#404855'
			}
		},
		cell: {
			normal: {
				background: '#8b9097',
				border: '#5b5b60',
				text: '#fff'
			},
			rowHeader:{
				background:'#525a66',
				border: '#525a66'
			},
			selectedRowHeader:{
				background: '#a2abb6'
			},
			header: {
				background: '#525a66',
				border: '#525a66',
				text: '#fff'
			},
			selectedHeader: {
				background: '#a2abb6',
				text: '#000'
			},
			focused: {
				border: '#a2abb6'
			},
			disabled: {
				text: '#b0b0b0'
			},
		}
	});
}

//# P2P 그리드 변경 / 디자이너 확인
function gf_setPPGridDesign() {
	var Grid = tui.Grid;
    Grid.applyTheme('dark',{
        grid: {
            background: '#fff',
            border: '#fff',
            text: '#fff'
        },
        selection: {
            background: '#fff',
            border: '#000'
        },
        toolbar: {
            border: '#000',
            background: '#fff'
        },
        scrollbar: {
            background: '#fff',
            thumb: '#d3d9e0',
            active: '#c1c1c1'
        },
        cell: {
            normal: {
                background: '#f2f5f8',
                border: '#fff',
                text: '#000'
            },
            head: {
                background: '#b9c6d4',
                border: '#b9c6d4',
                text: '#000'
            },
            editable: {
                background: '#f2f5f8'
            },
            selectedHead: {
                background: '#8fa4bb'
            },
            focused: {
                border: '#424c55'
            },
            disabled: {
                text: '#b0b0b0'
            },
            evenRow: {
                background: '#d3d9e0',
                border: '#d3d9e0',
                text: '#000'
            },
            currentRow: {
                background: '#fff !important'
            }
        }
    });

    $('.tui-grid-body-area').css('background-color','#fff');
    $('.tui-grid-head-area').css('border-color','#b9c6d4');
    $('.tui-grid-border-line-top').css('background-color','#b9c6d4');
    $('.tui-grid-border-line-bottom').css('background-color','#fff');
    $('.tui-grid-no-scroll-x').css('background-color','#46494b');
    
    $('.tui-grid-scrollbar-right-top').css('background-color','#fff');
    $('.tui-grid-scrollbar-right-top').css('border-color','#fff');
    $('.tui-grid-scrollbar-y-inner-border').css('background-color','#fff');
    $('.tui-grid-scrollbar-y-outer-border').css('background-color','#fff');
    $('.tui-grid-scrollbar-right-bottom').css('background-color','#fff');
    $('.tui-grid-scrollbar-right-bottom').css('border-color','#fff');
    
    $('.tui-grid-layer-state').css('background-color','#fff');
    $('.tui-grid-layer-state-content').css('color','#000');
    $('.tui-grid-scrollbar-frozen-border').css('border-color','#d3d9e0');
}

//# 검은색으로 그리드 변경 / 디자이너 확인
function gf_setCommonGridDesign() {
	var Grid = tui.Grid;
  Grid.applyTheme('dark',{
      grid: {
          background: '#46494b',
          border: '#46494b',
          text: '#fff'
      },
      selection: {
          background: '#fff',
          border: '#000'
      },
      toolbar: {
          border: '#000',
          background: '#fff'
      },
      scrollbar: {
          background: '#46494b',
          thumb: '#3c3e40',
          active: '#c1c1c1'
      },
      cell: {
          normal: {
              background: '#46494b',
              border: '#46494b',
              text: '#fff'
          },
          head: {
              background: '#2b2c2e',
              border: '#2b2c2e',
              text: '#fff'
          },
          editable: {
              background: '#fff'
          },
          selectedHead: {
              background: '#424c55'
          },
          focused: {
              border: '#424c55'
          },
          disabled: {
              text: '#b0b0b0'
          },
          evenRow: {
              background: '#3c3e40',
              border: '#3c3e40',
              text: '#fff'
          },
          currentRow: {
              background: '#5b666a !important'
          }
      }
  });

  $('.tui-grid-body-area').css('background-color','#46494b');
  $('.tui-grid-head-area').css('border-color','#46494b');
  $('.tui-grid-border-line-top').css('background-color','#2b2c2e');
  $('.tui-grid-border-line-bottom').css('background-color','#2b2c2e');
  $('.tui-grid-no-scroll-x').css('background-color','#46494b');
  
  $('.tui-grid-scrollbar-right-top').css('background-color','#2b2c2e');
  $('.tui-grid-scrollbar-right-top').css('border-color','#2b2c2e');
  $('.tui-grid-scrollbar-y-inner-border').css('background-color','#3c3e40');
  $('.tui-grid-scrollbar-y-outer-border').css('background-color','#3c3e40');
  $('.tui-grid-scrollbar-right-bottom').css('background-color','#3c3e40');
  $('.tui-grid-scrollbar-right-bottom').css('border-color','#3c3e40');
  
  $('.tui-grid-layer-state').css('background-color','#46494b');
  $('.tui-grid-layer-state-content').css('color','#ffffff');
  $('.tui-grid-scrollbar-frozen-border').css('border-color','#3c3e40');
}

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

// # 숫자 3자리마다 콤마를 추가한다.
function gf_Comma( src ) {
	if( gf_IsNull(src) ) return src;
	return src.toLocaleString();
}

// # 소수점 자리수 지정해서 콤마 추가한다.
function gf_Fix(value, loc) {
	if( gf_IsNull(value) ) return value;
	
	return gf_Comma(Number(Number(value).toFixed(loc)));
}

// ### 그리드 선택 관련 함수 ####################

//# 그리드에 체크 컬럼을 추가한다.
function gf_addSelectColumn( grid, list ) {
	var i;
	
	grid.selRowNum = -1;
	for( i=0; i<list.length; i++ ) 
		list[i].chk = "0";
}

//# 그리드 클릭 시 선택 처리한다.
function gf_selectRow( grid, rowNum ) {
	if( grid.selRowNum >= 0 )
		grid.setValue( grid.selRowNum, "chk", "0");
	grid.setValue(rowNum, "chk", "1");
	grid.selRowNum = rowNum;
}

//# 그리드 클릭시 표시하는 체크 포메터
function gf_dispCheckRow( value, rowData) {
 if( value == "1")
 	return "<image src='/resources/images/icon_check.png' style='width:13px; height:13px; '/>";
 return "";
}

// # 그리드 체크된 것만 펼침
function gf_updateFavoriteTree(gTreeGrid, favData, calType){
 var i=0, j=0, analId;
 var all = gTreeGrid.getData();
 var favAnalMnos = favData.analMno.split(',');

 if(favData.favType > 1 && calType != null)     // 시보의 경우, calType(평균,변화량...) 등을 설정
     $("#"+calType).val(favData.calType);

 gTreeGrid.collapseAll();
 gTreeGrid.uncheckAll();

 for(i in favAnalMnos) {
     analId = parseInt(favAnalMnos[i]);
     for (; j<all.length; j++) {
             if (all[j].idx == analId) {
             // gTreeGrid.expand(gTreeGrid.getParentRow(j).rowKey);
             gTreeGrid.check(j);
             break;
         }
     }
 }
 checkRows = gTreeGrid.getCheckedRows();
 for (i=0; i<checkRows.length; i++) {
     gTreeGrid.expand(checkRows[i].rowKey);
     ancestor = gTreeGrid.getAncestorRows(checkRows[i].rowKey);
     for (j=0; j<ancestor.length; j++)
             gTreeGrid.expand(ancestor[j].rowKey);
 }
}

// # tui grid 생성 함수
// # id : 그리드 생성 구역 id
// # cols : 컬럼 정보 setting
// # option : tui 옵션
// # data : 그리드에 넣을 data 변수
function gf_setTuiGrid(id, cols, options, data){
	alert(id);
	
	var grid = new tui.Grid({
	    el: $('#'+id)
	   /* , options*/
	    , columns : cols
	    , data : data
	});
	
	return grid;
}

