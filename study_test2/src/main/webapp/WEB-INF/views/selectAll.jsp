<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript" src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="/resources/js/testAjax.js"></script>
<meta charset="UTF-8">
<title>selectAll Page</title>
</head>
<body>

	<h3>study_shin 데이터베이스의 student 테이블 전체 목록</h3>
	
	<c:if test="${empty selectAll}" >
		테이블이 비었습니다.
	</c:if>
	<c:if test="${!empty selectAll}" >
		<table border="1">
			<th>아이디</th>
			<th>이름</th>
			<th>과목 코드</th>
			<th>점수</th>
			<c:forEach var="item" items="${selectAll}">
			<tr><!-- 첫번째 줄 시작 -->
	    		<td>${item.IDX}</td>
	    		<td>${item.NAME}</td>
	    		<td>${item.CODE}</td>
	    		<td>${item.SCORE}</td>
			</tr><!-- 첫번째 줄 끝 -->
			</c:forEach>
    	</table>
		<%-- <c:forEach var="item" items="${selectAll}">
			아이디 : ${item.IDX} 이름 : ${item.NAME}
			점수 : ${item.SCORE} 과목 코드 : ${item.DEPART_CODE} <br>
		</c:forEach> --%>
	</c:if>
	
	<button id="button1" >테스트 버튼</button>
	<button id="button2" >테스트 버튼2</button>
	
	<a href="../">
		<input type="button" value="처음으로"/>
	</a>
</body>
</html>