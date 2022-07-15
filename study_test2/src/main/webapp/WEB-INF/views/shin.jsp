<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/resources/css/tui-grid.css"/>
	<link rel="stylesheet" href="/resources/css/dropDown.css"/>
	<script src="/resources/js/jquery-3.1.1.js"></script>
	<script src="/resources/js/grid/tui-grid.js"></script>
	<script src="/resources/js/cmm/comtran.js"></script>
	<script src="/resources/js/testAjax.js"></script>
	<script src="/resources/js/dropDown.js"></script>
	
<meta charset="UTF-8">
<title>Spring SQL Test Page</title>
</head>
<body>
	메인 페이지입니다.<br>
	${TestM}<br>
	MariaDB 버전 => ${myb} <br>

	<input type="button" id="reset_btn" value="초기화"/>
	
	<div id="gridArea">
		<div style="float: right;">
			<div class="dropdown">
  				<button onclick="search_func();" class="dropbtn" id="search_btn">▼ 검색메뉴</button>
  				<div id="myDropdown" class="dropdown-content">
  					<input type="button" id="idx_search" class="dropMenu" value="학번"/>
    				<input type="button" id="name_search" class="dropMenu" value="이름"/>
    				<input type="button" id="code_search" class="dropMenu" value="과목 코드"/>
    				<input type="button" id="score_search" class="dropMenu" value="점수"/>
  				</div>
			</div>
			<input type="text" id="search_field" placeholder="입력"/>
			<input type="button" id="select_btn" value="검색"/>
			<input type="button" id="insert_btn" value="추가"/>
			<!-- <input type="button" id="update_btn" value="수정"/> -->
			<input type="button" id="delete_btn" value="삭제"/>
		</div>
		
		<div id="grid" style="border: 1px solid red;"></div>
	</div>
	
	<form name="hiddenForm" id="hiddenForm">
		<input type="hidden" id="h_idx"> <br>
		<input type="hidden" id="h_name"> <br>
		<input type="hidden" id="h_code"> <br>
		<input type="hidden" id="h_score"> <br>
	</form>
</body>
</html>