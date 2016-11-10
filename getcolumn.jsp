<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="good.QiDatabase"  %>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="java.sql.ResultSetMetaData" %>
<%@page import="java.net.URLDecoder"%>

<%
	int cnt = 0;

	String sql = "SELECT content FROM ";
//	String sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ";
	request.setCharacterEncoding("UTF-8");

	String text = URLDecoder.decode(request.getParameter("q"), "UTF-8");
	sql += text;
	System.out.println(text);	
	QiDatabase qi = new QiDatabase();
	ResultSet rs = qi.selectDB(sql);
	System.out.println("result set : " + rs.toString());
	int rowcount = 0;
	
	if (rs.last()) {
		  rowcount = rs.getRow();
		  rs.beforeFirst(); // not rs.first() because the rs.next() below will move on, missing the first element
		}
	String result[] = new String[rowcount];
	
	while(rs.next()){
		result[cnt] = rs.getString("content");
		
		out.write(result[cnt++] + " ");		
	}
%>
