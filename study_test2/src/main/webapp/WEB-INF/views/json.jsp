<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/resources/css/tui-grid.css"/>
	<script src="/resources/js/jquery-3.1.1.js"></script>
	<script src="/resources/js/grid/tui-grid.js"></script>
	<script src="/resources/js/cmm/comtran.js"></script>
	<script src="/resources/js/jsonParse.js"></script>
<meta charset="UTF-8">
<title>JSON Parse Test</title>
</head>
<body>
	<h3>JSON 파싱 페이지입니다.</h3>
	
	<div id="gridArea">
		<input type="button" id="reset_btn" style="height:30px;" value="초기화"/>
		<div style="float: right;">
			<input type="text" id="start" placeholder="시작 페이지"/>
			<input type="text" id="end" placeholder="끝 페이지"/>
			<input type="text" id="perPage" placeholder="페이지 당 데이터 갯수"/>
			<input type="button" id="insert_btn" value="파싱"/>
		</div>
		<div>
			<input type="text" id="search_field" placeholder="충전소 명칭 검색"/>
			<input type="button" id="select_btn" value="검색"/>
			<input type="button" id="delete_btn" value="삭제"/>
		</div>
		<div id="grid" style="border: 1px solid red;"></div>
	</div>
</body>
</html>