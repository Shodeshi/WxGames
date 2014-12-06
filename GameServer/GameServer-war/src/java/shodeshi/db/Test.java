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
import shodeshi.db.model.Room;
import shodeshi.db.model.RoomUserRel;
import shodeshi.db.model.User;

/**
 *
 * @author tyang
 */
public class Test {

    public static void t1() throws Exception {
        Class.forName("com.mysql.jdbc.Driver");
    }

    public static Connection t2() throws Exception {
        Connection conn = DriverManager.getConnection("jdbc:mysql://shodeshi.mysql.rds.aliyuncs.com:3306/wxgames", "shodeshi", "654321qw");
        return conn;
    }

    public static void t3() {
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

    public static void main(String args[]) {
        try {
            GameDAO dao = new DefaultGameDAO();
//            User user = new User();
//            user.setName("test");
//            dao.addUser(user);
//            dao.getRoomUserRelByRoomId(1l);
            
            RoomUserRel rel = new RoomUserRel();
            rel.setId(65l);
            rel.setRoomId(1l);
            rel.setUserId(8l);
            rel.setIsReady(11);
            rel.setPlayerIndex(0);
            rel.setType(1);
            dao.updateRoomUserRel(rel);
            

        } catch (Exception ex) {
            Logger.getLogger(Test.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
