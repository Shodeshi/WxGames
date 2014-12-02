package shodeshi.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.logging.Level;
import java.util.logging.Logger;
import shodeshi.db.model.Room;
import shodeshi.db.model.User;

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

    @Override
    public void insertRoom(Room room) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("insert into room(player_id_1, player_id_2, is_ready_1, is_ready_2) values(?,?,?,?)");
            if (room.getPlayerId1() == null) {
                stat.setNull(1, Types.BIGINT);
            } else {
                stat.setLong(1, room.getPlayerId1());
            }
            if (room.getPlayerId2() == null) {
                stat.setNull(2, Types.BIGINT);
            } else {
                stat.setLong(2, room.getPlayerId2());
            }
            if (room.getIsReady1() == null) {
                stat.setNull(3, Types.INTEGER);
            } else {
                stat.setInt(3, room.getIsReady1());
            }
            if (room.getIsReady2() == null) {
                stat.setNull(4, Types.INTEGER);
            } else {
                stat.setInt(4, room.getIsReady2());
            }
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

    @Override
    public Room getRoomById(Long id) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;
        ResultSet rs = null;

        Room room = null;
        try {
            stat = conn.prepareStatement("select * from room where id = ?");
            stat.setLong(1, id);
            rs = stat.executeQuery();

            while (rs.next()) {
                room = new Room();
                room.setId(rs.getLong("id"));
                room.setPlayerId1(rs.getLong("player_id_1"));
                room.setPlayerId2(rs.getLong("player_id_2"));
                room.setIsReady1(rs.getInt("is_ready_1"));
                room.setIsReady2(rs.getInt("is_ready_2"));
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

        return room;
    }

    @Override
    public synchronized void updateRoom(Room room) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("update room set player_id_1 = ?, player_id_2 = ?, is_ready_1 = ?, is_ready_2 = ? where id = ?");
            stat.setLong(1, room.getPlayerId1());
            stat.setLong(2, room.getPlayerId2());
            stat.setInt(3, room.getIsReady1());
            stat.setInt(4, room.getIsReady2());
            stat.setLong(5, room.getId());
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
