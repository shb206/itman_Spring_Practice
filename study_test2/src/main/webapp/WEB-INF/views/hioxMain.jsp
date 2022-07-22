<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/resources/css/tui-grid.css"/>
	<link rel="stylesheet" href="/resources/css/dropDown.css"/>
	<link rel="stylesheet" href="/resources/css/aTagStyle.css"/>
	
	<script src="/resources/js/jquery-3.1.1.js"></script>
	<script src="/resources/js/grid/tui-grid.js"></script>
	<script src="/resources/js/cmm/comtran.js"></script>
	<script src="/resources/js/hiox_grid.js"></script>
	<script src="/resources/js/dropDown.js"></script>

	<style type="text/css">
		.box { border:1px solid; background-color:rgba(80, 80, 80, 0.5);
				color:#000000; width:200px; height:30px; line-height:30px; text-align:center;}
		table { width : 100%; text-align:center;}
		select { width:100px; height:20px; margin-left:10px; margin-right:10px;}
		.page { padding:5px; }
	</style>
<meta charset="UTF-8">
<title>HIOX Practice Page</title>
</head>
<body>
	<div class="box">입고 화면</div>
	<div>
		<!-- 상단 정보 영역 -->
		<div style="border:1px solid; height:80px; margin-top:10px; line-height:80px;
					padding-left:30px; font-size:20px;">
			재질
			<select id="texture">
				<option>---재질---</option>
				<c:forEach var="name" items="${texture_list}">
					<option value="${name}">${name}</option>
				</c:forEach>
			</select>
			두께
			<select id="thickness">
				<option>---두께---</option>
				<c:forEach var="name" items="${thickness_list}">
					<option value="${name}">${name}</option>
				</c:forEach>
			</select>
			크기유형
			<select id="size">
				<option>---크기유형---</option>
				<c:forEach var="name" items="${size_list}">
					<option value="${name}">${name}</option>
				</c:forEach>
			</select>
			입고일
			<input type="date" id="start_date"/>
			~
			<input type="date" id="end_date"/>
			<button id="search_btn">검색</button>
		</div>
		<!-- 버튼 영역 -->
		<div style="float:right; margin:5px;">
			<button id="release_cancel_btn">출고 취소</button>
			<button id="release_btn">출고</button>
			<button id="delete_btn">삭제</button>
		</div>
		<!-- 표 영역 -->
		<div id="grid" style="margin-top:5px; width:97%; margin:0 auto;"></div>
		<button id="reset_btn">초기화</button>
		<!-- 페이징 버튼 영역 -->
		<div style="text-align:center;">
			<button id="firstPage">◀◀ </button>
			<button id="prevPageList">◀ </button>
			
			<!-- 페이징 버튼 생성 영역 -->
			<div id="pagingArea" style="display:inline;"></div>
			
			<button id="nextPageList">▶ </button>
			<button id="lastPage">▶▶ </button>
		</div>
	</div>
	
	<form name="hiddenForm" id="hiddenForm">
		<input type="hidden" id="h_page"> <br>
		<input type="hidden" id="h_texture"> <br>
		<input type="hidden" id="h_thickness"> <br>
		<input type="hidden" id="h_size"> <br>
		<input type="hidden" id="h_start_date"> <br>
		<input type="hidden" id="h_end_date"> <br>
	</form>
</body>
</html>