<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="good.QiDatabase"  %>
<%@ page import="java.text.ParseException" %>
<%@ page import="java.io.*" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="java.text.ParseException" %>

<%

	QiDatabase qi = new QiDatabase();
	request.setCharacterEncoding("utf-8");
	
	String q_sql = null;
	int i;
	
	StringBuffer jsonBuffer = new StringBuffer();
	JSONObject jsonObject = null;
	String json = null;
	String line = null;
	
	
	try{
		BufferedReader reader = request.getReader();
		
		while((line = reader.readLine())!=null){
			jsonBuffer.append(line);
		}
		
		json = jsonBuffer.toString();
		
		
		JSONParser jsonParser = new JSONParser();
		
		jsonObject = (JSONObject)jsonParser.parse(json);
		String qi_title = jsonObject.get("title").toString();		//title 받아오기
	
		q_sql = "CREATE TABLE " + qi_title + " ( colnum INT, content VARCHAR(200))"; 
		qi.createDB(q_sql);
				
		JSONArray content_infoArray = (JSONArray) jsonObject.get("content");
		String title_list[] = new String[content_infoArray.size()];

		for( i = 0; i < content_infoArray.size(); i++){	
			JSONObject qi_object = (JSONObject) content_infoArray.get(i);
			String query;
			String type = qi_object.get("type").toString();
			title_list[i] = qi_object.get("title").toString();
			if(type == "short_answer"){
				query  =  "insert into " +  qi_title + " values ("+ i + ", '" + qi_object.toString() + "')";	
				System.out.println("query : " + query);
			}
			else{
				query  =  "insert into " +  qi_title + " values ("+ i + ", '" + qi_object.toString() + "')";
			}
			System.out.println("qqqq");
			qi.insertDB(query);
			
		}
		String a_sql = "CREATE TABLE " + qi_title + "_index" + " ( ";
		
		for( i = 0 ; i < content_infoArray.size() - 1; i++){
			a_sql += title_list[i] + " TEXT, ";
		}
		a_sql += title_list[i] + " TEXT)";
		System.out.println(a_sql);
		qi.createDB(a_sql);
		
	
	}catch(Exception e){
		e.printStackTrace();
	}
	
%>