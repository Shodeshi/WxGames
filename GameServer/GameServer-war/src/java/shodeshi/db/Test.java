/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package shodeshi.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author tyang
 */
public class Test {
    public static void main(String args[]){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://shodeshi.mysql.rds.aliyuncs.com:3306/wxgames", "shodeshi", "654321qw");
            String sql = "select * from user";     // 查询数据的sql语句  
            Statement st = (Statement) conn.createStatement();    //创建用于执行静态sql语句的Statement对象，st属局部变量  
              
            ResultSet rs = st.executeQuery(sql);    //执行sql查询语句，返回查询数据的结果集  
            while (rs.next()) { // 判断是否还有下一个数据  
                  
                // 根据字段名获取相应的值  
                String name = rs.getString("name");  
                String id = rs.getString("id");
                  
                //输出查到的记录的各个字段的值  
                System.out.println(id + "-" + name);  
              
            }  
            conn.close();   //关闭数据库连接  
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
