/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package shodeshi.websocket.server.model;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import shodeshi.db.model.Room;

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

    public String toJSONString() {
        JsonObjectBuilder builder = Json.createObjectBuilder()
                .add("id", room.getId())
                .add("name", room.getName());
        if (user1 != null) {
            builder.add("player1", user1.toJSONString());
        }
        if (user2 != null) {
            builder.add("player2", user2.toJSONString());
        }
        return builder.build().toString();
    }

    public void sendMessage(String message) {
        if (user1 != null) {
            user1.getSession().getAsyncRemote().sendText(message);
        }
        if (user2 != null) {
            user2.getSession().getAsyncRemote().sendText(message);
        }
    }
}
