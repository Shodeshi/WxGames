package shodeshi.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import shodeshi.model.User;

/**
 *
 * @author Shodeshi
 */
public class DefaultGameDAO implements GameDAO {

    private ConnectionFactory connectionFactory;

    public DefaultGameDAO() {
        connectionFactory = new DefaultConnectionFactory();
    }

    @Override
    public User getUserByName(String name) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;
        ResultSet rs = null;

        User user = null;
        try {
            stat = conn.prepareStatement("select * from user where name = ?");
            stat.setString(1, name);
            rs = stat.executeQuery();

            while (rs.next()) {
                user = new User();
                user.setId(rs.getLong("id"));
                user.setName(rs.getString("name"));
                break;
            }
        } catch (SQLException ex) {
            Logger.getLogger(DefaultGameDAO.class.getName()).log(Level.SEVERE, "Exception occured while executing sql in getUserByName", ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stat != null) {
                    stat.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(DefaultGameDAO.class.getName()).log(Level.SEVERE, "Exception occured while closing connection in getUserByName", ex);
            }
        }

        return user;
    }

    @Override
    public void addUser(User user) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("insert into user(name) values(?)");
            stat.setString(1, user.getName());
            stat.executeUpdate();
        } catch (SQLException ex) {
            Logger.getLogger(DefaultGameDAO.class.getName()).log(Level.SEVERE, "Exception occured while executing sql in addUser", ex);
        } finally {
            try {
                if (stat != null) {
                    stat.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(DefaultGameDAO.class.getName()).log(Level.SEVERE, "Exception occured while closing connection in addUser", ex);
            }
        }

    }

}
