/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package shodeshi.controller;

import java.io.IOException;
import java.io.StringReader;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.websocket.Session;
import shodeshi.db.DefaultGameDAO;
import shodeshi.db.GameDAO;
import shodeshi.db.model.Room;
import shodeshi.db.model.RoomUserRel;
import shodeshi.db.model.User;
import shodeshi.websocket.server.model.ServerRoom;
import shodeshi.websocket.server.model.ServerUser;

/**
 *
 * @author tyang
 */
public class GameController {

    private final static GameController controller = new GameController();
    private GameDAO dao;
    private Map<Long, ServerRoom> rooms;

    private GameController() {
        dao = new DefaultGameDAO();
        rooms = new HashMap<Long, ServerRoom>();
    }

    public static GameController getInstance() {
        return controller;
    }

    public void processRequest(String message, Session session) throws IOException {
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

                // Build ServerUser object
                ServerUser serverUser = new ServerUser();
                serverUser.setUser(user);
                serverUser.setSession(session);
                serverUser.setIsReady(0);

                // Retrieve room infomation
                // Need improve with synchronized
                long roomId = 1l;
                Room room = null;
                ServerRoom serverRoom = null;
                if (rooms.containsKey(roomId)) {
                    serverRoom = rooms.get(roomId);
                    room = serverRoom.getRoom();
                } else {
                    serverRoom = new ServerRoom();
                    room = dao.getRoomById(roomId);
                    serverRoom.setRoom(room);
                    rooms.put(roomId, serverRoom);
                }

                List<RoomUserRel> rels = dao.getRoomUserRelByRoomId(roomId);
                RoomUserRel rel = new RoomUserRel();
                rel.setRoomId(roomId);
                rel.setUserId(user.getId());
                rel.setType(1);
                rel.setIsReady(0);
                if (rels.isEmpty()) {
                    rel.setPlayerIndex(0);
                    serverRoom.setUser1(serverUser);
                } else {
                    rel.setPlayerIndex(1);
                    serverRoom.setUser2(serverUser);
                }
                dao.insertRoomUserRel(rel);
                // Send response back
                String response = Json.createObjectBuilder()
                        .add("event", "login")
                        .add("room", serverRoom.toJSONString())
                        .build().toString();
                serverRoom.sendMessage(response);
                break;
            case "reset":
                reset();
                break;
        }
    }

    public void reset() {
        rooms.clear();
        dao.deleteRoomUserRelByRoom(1l);
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