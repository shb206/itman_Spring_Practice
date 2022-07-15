<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script src="/resources/js/jquery-3.1.1.js"></script>
	<script src="/resources/js/popup.js"></script>
<title>Insert title here</title>
</head>
<body>
	<h3>학생 정보 수정</h3>
	
	<form name="updateForm" id="updateForm">
		<span> 학번 </span> 
		<input type="number" id="idx" name="idx" readonly> <br>
		<span> 이름 </span>
		<input type="text" id="name" name="name"> <br>
		<span> 과목 코드 </span>
		<input type="number" id="code" name="code"> <br>
		<span> 점수 </span>
		<input type="number" id="score" name="score">
		<input type="hidden" id="form_type" value="update">
	</form>
	
	<input type="button" id="test_btn" value="확인"/>
</body>
</html>