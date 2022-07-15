<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>insert Page</title>
</head>
<body>
	<c:if test="${empty student}">
		삽입 실패 <br>
		이미 ${idx}의 id를 가진 학생이 존재합니다 <br>
	</c:if>
	<c:if test="${!empty student}">
		<h1>삽입된 데이터</h1>
		아이디 : ${student.idx} <br>
		이름 : ${student.name} <br>
		종목 코드 : ${student.code} <br>
		점수 : ${student.score} <br>
	</c:if>
	<br>
	
	<a href="../">
		<input type="button" value="처음으로"/>
	</a>
</body>
</html>