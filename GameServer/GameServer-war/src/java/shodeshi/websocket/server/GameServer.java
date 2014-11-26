/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package shodeshi.websocket.server;

import java.io.IOException;
import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import shodeshi.db.DefaultGameDAO;
import shodeshi.db.GameDAO;
import shodeshi.model.User;

/**
 *
 * @author tyang
 */
@ServerEndpoint("/server")
public class GameServer {

    @OnMessage
    public void onMessage(String message, Session session)
            throws IOException, InterruptedException {

        // Read request from JSON
        JsonReader jsonreader = Json.createReader(new StringReader(message));
        JsonObject request = jsonreader.readObject();
        jsonreader.close();
        // Analyse the request event
        String requestEvent = request.getString("event");
        switch (requestEvent) {
            case "login":
                // TODO improve here
                GameDAO dao = new DefaultGameDAO();
                // Retrieve the user from database
                String userName = request.getString("userName");
                User user = dao.getUserByName(userName);
                // If user not exists, create one
                if (user == null) {
                    user = new User();
                    user.setName(userName);
                    dao.addUser(user);
                }
                // Send response back
                JsonObjectBuilder responseBuilder = Json.createObjectBuilder();
                String response = responseBuilder.add("event", "login").build().toString();
                sendToOne(session, response);
        }

    }

    @OnOpen
    public void onOpen(Session session) throws IOException, InterruptedException {
        System.out.println("Connected: " + this);
    }

    @OnClose
    public void onClose() {

    }

    @OnError
    public void onError(Throwable t) {
        t.printStackTrace();
    }

    private void sendToOne(Session session, String message) throws IOException {
        session.getBasicRemote().sendText(message);
    }

    private void sendToAll(Session session, String message) throws IOException {
        for (Session s : session.getOpenSessions()) {
            s.getBasicRemote().sendText(message);
        }
    }
}
