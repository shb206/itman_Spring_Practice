<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>delete Page</title>
</head>
<body>
	<c:if test="${check eq false}">
		해당 id를 가진 학생은 존재하지 않습니다. <br>
	</c:if>
	<c:if test="${check eq true}">
		삭제된 학생의 id : ${idx} <br>	
	</c:if>
	
	
	<a href="../">
		<input type="button" value="처음으로"/>
	</a>
</body>
</html>