package shodeshi.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Shodeshi
 */
public class DefaultConnectionFactory implements ConnectionFactory {

    public DefaultConnectionFactory() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DefaultConnectionFactory.class.getName()).log(Level.SEVERE, "Unexpected exception occured while inializing jdbc", ex);
        }
    }

    @Override
    public Connection getConnection() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:mysql://shodeshi.mysql.rds.aliyuncs.com:3306/wxgames", "shodeshi", "654321qw");
        } catch (SQLException ex) {
            Logger.getLogger(DefaultConnectionFactory.class.getName()).log(Level.SEVERE, "Unexpected exception occured while creating connection", ex);
        }
        return conn;
    }

}
