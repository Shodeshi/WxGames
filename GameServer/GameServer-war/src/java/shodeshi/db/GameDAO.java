package shodeshi.db;

import java.util.List;
import shodeshi.db.model.Game;
import shodeshi.db.model.Room;
import shodeshi.db.model.RoomUserRel;
import shodeshi.db.model.User;

/**
 *
 * @author Shodeshi
 */
public interface GameDAO {
    public User getUserByName(String name);
    public void addUser(User user);
    public void insertRoom(Room room);
    public Room getRoomById(Long id);
    public void updateRoom(Room room);
    public List<RoomUserRel> getRoomUserRelByRoomId(Long roomId);
    public void insertRoomUserRel(RoomUserRel rel);
    public void updateRoomUserRel(RoomUserRel rel);
    public void deleteRoomUserRelByRoom(Long roomId);
    public void insertGame(Game game);
    public void updateGame(Game game);
}
