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
import shodeshi.util.Utils;

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
//            GameDAO dao = new DefaultGameDAO();
//            
//            Game game = new Game();
//            game.setId(1);
//            game.setRoomId(1);
//            game.setInitBoard("aa");
//            game.setCurrentBoard("cc");
//            game.setTurn(0);
//            game.setMoves("m");
//            game.setWinner(8l);
//            dao.updateGame(game);
//            int arr[][] = {{1,2}, {2,3}};
//            int initArr[][] = {{0, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0}, {8, 0}, {1, 2}, {7, 2}, {0, 3}, {2, 3}, {4, 3}, {6, 3}, {8, 3}, {0, 9}, {1, 9}, {2, 9}, {3, 9}, {4, 9}, {5, 9}, {6, 9}, {7, 9}, {8, 9}, {1, 7}, {7, 7}, {0, 6}, {2, 6}, {4, 6}, {6, 6}, {8, 6}};
//            System.out.println(initArr.length);
//            System.out.println(Utils.getRandomChessArray().length);
//            for(int i : Utils.getRandomChessArray())
//                System.out.print(i + ", ");
//            JsonBuilderFactory factory = Json.createBuilderFactory(null);
//            JsonArray arr = factory.createArrayBuilder()
//                    .add(factory.createArrayBuilder()
//                            .add(0)
//                            .add(1))
//                    .add(factory.createArrayBuilder()
//                            .add(1)
//                            .add(1))
//                    .build();
//            String str = arr.toString();
            
            int arr[][] = Utils.createBoardArray();

            for(int y=0;y<10;y++){
                for(int x=0;x<9;x++){
                    System.out.print(arr[x][y] + ",");
                }
                System.out.println();
            }

//            arr.getJsonArray(0).set(1, new JsonNumber(1));
//            System.out.println(arr.getJsonArray(0).getInt(0));
//            Object[] a = arr.toArray();
//            System.out.println(arr.toArray());
//
//            String message = "[[0,1],[1,1]]";
//            JsonReader jsonreader = Json.createReader(new StringReader(message));
//            JsonArray request = jsonreader.readArray();
//            jsonreader.close();

        } catch (Exception ex) {
            Logger.getLogger(Test.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
