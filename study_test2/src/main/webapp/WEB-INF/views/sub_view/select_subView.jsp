<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script src="/resources/js/jquery-3.1.1.js"></script>
	<script src="/resources/js/popup.js"></script>
<title>select Page</title>
</head>
<body>
	<h3>찾을 학생의 학번을 입력하세요</h3>
	
	<form name="selectForm" id="selectForm">
		<span> 학번 </span> 
		<input type="number" id="idx" name="idx"> <br>
		<input type="hidden" id="name" name="name" value=0>
		<input type="hidden" id="code" name="code" value=0>
		<input type="hidden" id="score" name="score" value=0>
		<input type="hidden" id="form_type" value="select">
	</form>
	
	<input type="button" id="test_btn" value="확인"/>
</body>
</html>