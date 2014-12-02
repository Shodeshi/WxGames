package shodeshi.db;

import shodeshi.db.model.Room;
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
}
