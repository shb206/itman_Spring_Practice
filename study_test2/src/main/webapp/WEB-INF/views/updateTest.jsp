<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Update Test Page</title>
</head>
<body>
	<c:if test="${check eq true}">
		id : ${idx} 학생의 이름이 ${name}으로 변경되었습니다. <br>
	</c:if>
	<c:if test="${check eq false}">
		id가 ${idx}인 학생은 존재하지 않습니다. <br>
	</c:if>
	
	<a href="../">
		<input type="button" value="처음으로"/>
	</a>
</body>
</html>