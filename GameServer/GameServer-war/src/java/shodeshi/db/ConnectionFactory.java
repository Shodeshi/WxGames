package shodeshi.db;

import java.sql.Connection;

/**
 *
 * @author Shodeshi
 */
public interface ConnectionFactory {
    public Connection getConnection();
}
