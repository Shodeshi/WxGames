/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package shodeshi.websocket.server.model;

import java.math.BigDecimal;
import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.Session;
import shodeshi.db.model.User;

/**
 *
 * @author tyang
 */
public class ServerUser {

    private User user;
    private Session session;
    private int isReady;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public int getIsReady() {
        return isReady;
    }

    public void setIsReady(int isReady) {
        this.isReady = isReady;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                .add("id", user.getId())
                .add("name", user.getName())
                .add("isReady", isReady)
                .build();
    }
}
