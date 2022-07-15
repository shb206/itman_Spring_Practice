<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>select Page</title>
</head>
<body>
	<c:if test="${empty selectOne}">
		해당 인덱스를 가진 학생은 없습니다. <br>
	</c:if>
	<c:if test="${!empty selectOne}">
		<c:forEach var="item" items="${selectOne}">
		아이디 : ${item.IDX} 이름 : ${item.NAME}
		점수 : ${item.SCORE} 과목 코드 : ${item.DEPART_CODE} <br>
		</c:forEach>
	</c:if>
	<a href="../">
		<input type="button" value="처음으로"/>
	</a>
</body>
</html>