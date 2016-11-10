<%@ page contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>
<%@ page import = "java.sql.*" %>

<HTML>
	<HEAD>
		<link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
		<link type="text/css" rel="stylesheet" href="css/question.css"/>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	</HEAD>
	<BODY>	
		  <a class="btn-floating btn-large waves-effect waves-light red" id = "create_qi"><i class="material-icons">add</i></a>
		<table id = "qiList">
		<%
		
			Connection conn = null;
			PreparedStatement pstmt = null;
			try{
				String url = "jdbc:mysql://localhost:3306/webdb?autoReconnect=true&useSSL=false";
				String user = "root";
				String passwd = "4112665aA";
				
				Class.forName("com.mysql.jdbc.Driver");
				conn = DriverManager.getConnection(url, user, passwd);
				
				String sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'webdb' not like '%_index'";
				pstmt = conn.prepareStatement(sql);
				
				
				ResultSet rs= pstmt.executeQuery();
				
				while(rs.next()){
					String tableName = rs.getString("table_name");
			%>
				<tr>
					<td><a id = "<%=tableName%>"><%=tableName %></a></td>
				</tr>
			<% 
				}
			}catch(Exception e){
				e.printStackTrace();
			}
			%>
		</table>
	<form>
		 <div id="modal2" class="modal">
	   		 <div class="modal-content">   		
	  	 </div>
	     <div class="modal-footer">
	     	 <a id = "qi_submit"class=" modal-action waves-effect waves-green btn-flat">Agree</a>
	     </div>
		 </div>
	 </form>
          
	<div id="modal1" class="modal modal-fixed-footer">
       <form action="/good/qi" method="post">
    	<div class="modal-content">
      		<h4>형식 선택</h4>
      			<p>
      				<input name = "group1" type="radio" id="test1" value="selective" checked="true"/>
      				<label for="test1">선택형</label>
      				
      				<input name = "group1" type="radio" id="test2" value="short_answer"/>
      				<label for="test2">단답형</label>
      			</p>	
      			<p>
      				<input placeholder="질문 내용" name= "title" type="text" id="title"/>
      			</p>
      			<div id="templatebox">
      				<p class="center" style="margin:auto;">자주 쓰는 템플릿 - template</p>      					
      			</div>
      			<div id="templatelist">
      				<p><a class="waves-effect waves-light btn template" id="1">button</a></p>
      				<p><a class="waves-effect waves-light btn template" id="2">button</a></p>
      				<p><a class="waves-effect waves-light btn template" id="3">button</a></p>
      			</div>
    	</div>
    	<div class="modal-footer">
     		 <a class="waves-effect waves-green btn-flat" id="confirm" >Agree</a>
   		</div>
   	  </form>
 	</div>
		<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="js/materialize.min.js"></script>
		<script type="text/javascript" src="js/index.js"></script>
		<script type="text/javascript" src="js/answer.js"></script>
	</BODY>
</HTML>