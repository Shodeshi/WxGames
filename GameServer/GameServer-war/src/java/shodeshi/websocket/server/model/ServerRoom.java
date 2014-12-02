/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package shodeshi.websocket.server.model;

import javax.websocket.Session;
import shodeshi.db.model.Room;
import shodeshi.db.model.User;

/**
 *
 * @author tyang
 */
public class ServerRoom {
    private Room room;
    private ServerUser user1;
    private ServerUser user2;

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public ServerUser getUser1() {
        return user1;
    }

    public void setUser1(ServerUser user1) {
        this.user1 = user1;
    }

    public ServerUser getUser2() {
        return user2;
    }

    public void setUser2(ServerUser user2) {
        this.user2 = user2;
    }
    
}
