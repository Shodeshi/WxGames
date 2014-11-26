package shodeshi.db;

import shodeshi.model.User;

/**
 *
 * @author Shodeshi
 */
public interface GameDAO {
    public User getUserByName(String name);
    public void addUser(User user);
}
