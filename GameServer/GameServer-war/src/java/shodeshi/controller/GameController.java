/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package shodeshi.controller;

import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.websocket.Session;
import shodeshi.db.DefaultGameDAO;
import shodeshi.db.GameDAO;
import shodeshi.db.model.Room;
import shodeshi.db.model.User;
import shodeshi.websocket.server.model.ServerRoom;

/**
 *
 * @author tyang
 */
public class GameController {
    private final static GameController controller = new GameController();
    private GameDAO dao;
    private Map<String, ServerRoom> rooms;
    
    private GameController(){
        dao = new DefaultGameDAO();
        rooms = new HashMap<String, ServerRoom>();
    }
    public static GameController getInstance(){
        return controller;
    }
    
    public void processRequest(String message, Session session) throws IOException{
        // Read request from JSON
        JsonReader jsonreader = Json.createReader(new StringReader(message));
        JsonObject request = jsonreader.readObject();
        jsonreader.close();
        // Analyse the request event
        String requestEvent = request.getString("event");
        switch (requestEvent) {
            case "login":
                // Retrieve the user from database
                String userName = request.getString("userName");
                User user = dao.getUserByName(userName);
                // If user not exists, create one
                if (user == null) {
                    user = new User();
                    user.setName(userName);
                    dao.addUser(user);
                    // Retrieve again, to get the id
                    user = dao.getUserByName(userName);
                }
                
               Room room = dao.getRoomById(1l);
               if(room.getPlayerId1() == null)
                   room.setPlayerId1(user.getId());
               else
                   room.setPlayerId2(user.getId());
                
                // Send response back
                JsonObjectBuilder responseBuilder = Json.createObjectBuilder();
                String response = responseBuilder.add("event", "login").build().toString();
                sendToOne(session, response);
        }
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
