package shodeshi.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import shodeshi.db.model.Game;
import shodeshi.db.model.Room;
import shodeshi.db.model.RoomUserRel;
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
            stat = conn.prepareStatement("insert into room(name) values(?)");
            if (room.getName() == null) {
                stat.setNull(1, Types.VARCHAR);
            } else {
                stat.setString(1, room.getName());
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
                room.setName(rs.getString("name"));
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
    public void updateRoom(Room room) {
        if (room.getName() == null) {
            return;
        }

        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("update room set name = ? where id = ?");
            stat.setString(1, room.getName());
            stat.setLong(2, room.getId());
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
    public List<RoomUserRel> getRoomUserRelByRoomId(Long roomId) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;
        ResultSet rs = null;

        List<RoomUserRel> result = new ArrayList<RoomUserRel>();
        try {
            stat = conn.prepareStatement("select * from room_user_rel where room_id = ?");
            stat.setLong(1, roomId);
            rs = stat.executeQuery();

            while (rs.next()) {
                RoomUserRel rel = new RoomUserRel();
                rel.setId(rs.getLong("id"));
                rel.setRoomId(rs.getLong("room_id"));
                rel.setUserId(rs.getLong("user_id"));
                rel.setType(rs.getInt("type"));
                rel.setIsReady(rs.getInt("is_ready"));
                rel.setPlayerIndex(rs.getInt("player_index"));
                result.add(rel);
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

        return result;
    }

    @Override
    public void insertRoomUserRel(RoomUserRel rel) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("insert into room_user_rel(room_id, user_id, type, is_ready, player_index) values (?,?,?,?,?)");
            stat.setLong(1, rel.getRoomId());
            stat.setLong(2, rel.getUserId());
            stat.setInt(3, rel.getType());
            stat.setInt(4, rel.getIsReady());
            stat.setInt(5, rel.getPlayerIndex());
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
    public void updateRoomUserRel(RoomUserRel rel) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("update room_user_rel set room_id = ?, user_id = ?, type = ?, is_ready = ?, player_index = ? where id = ?");
            stat.setLong(1, rel.getRoomId());
            stat.setLong(2, rel.getUserId());
            stat.setInt(3, rel.getType());
            stat.setInt(4, rel.getIsReady());
            stat.setInt(5, rel.getPlayerIndex());
            stat.setLong(6, rel.getId());
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
    public void deleteRoomUserRelByRoom(Long roomId) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("delete from room_user_rel where room_id = ?");
            stat.setLong(1, roomId);
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
    public void insertGame(Game game) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("insert into game(room_id, init_board, cur_board, turn) values (?,?,?,?)");
            stat.setLong(1, game.getRoomId());
            stat.setString(2, game.getInitBoard());
            stat.setString(3, game.getCurrentBoard());
            stat.setInt(4, game.getTurn());
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
    public void updateGame(Game game) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("update game set room_id = ?, init_board = ?, cur_board = ?, turn = ?, moves = ?, winner = ? where id = ?");
            stat.setLong(1, game.getRoomId());
            stat.setString(2, game.getInitBoard());
            stat.setString(3, game.getCurrentBoard());
            stat.setInt(4, game.getTurn());
            stat.setString(5, game.getMoves());
            stat.setLong(6, game.getWinner());
            stat.setLong(7, game.getId());
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
    public void deleteRoomUserRelById(Long id) {
        Connection conn = connectionFactory.getConnection();
        PreparedStatement stat = null;

        try {
            stat = conn.prepareStatement("delete from room_user_rel where id = ?");
            stat.setLong(1, id);
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
