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
import javax.json.JsonArrayBuilder;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.websocket.Session;
import shodeshi.db.DefaultGameDAO;
import shodeshi.db.GameDAO;
import shodeshi.db.model.Game;
import shodeshi.db.model.Room;
import shodeshi.db.model.RoomUserRel;
import shodeshi.db.model.User;
import shodeshi.util.Utils;
import shodeshi.websocket.server.model.ServerGame;
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
    private Map<String, Long> sessionRoomMap;

    private GameController() {
        dao = new DefaultGameDAO();
        rooms = new HashMap<Long, ServerRoom>();
        sessionRoomMap = new HashMap<String, Long>();
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
                login(request, session);
                break;
            case "getReady":
                getReady(request);
                break;
            case "reset":
                reset();
                break;
            case "showChess":
                showChess(request);
                break;
            case "moveChess":
                moveChess(request);
                break;

        }
    }

    private void login(JsonObject request, Session session) {
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

        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        // Build response JSON for user object
        JsonObjectBuilder builder = factory.createObjectBuilder()
                .add("event", "login")
                .add("user", factory.createObjectBuilder()
                        .add("id", user.getId())
                        .add("name", user.getName()));
        // Add player counts to the response
        JsonArrayBuilder roomsBuilder = factory.createArrayBuilder();
        for(ServerRoom serverRoom : rooms.values()){
            roomsBuilder.add(serverRoom.toJSONObjectForPlayerCount());
        }
        builder.add("rooms", roomsBuilder.build());
        // Send response back
        session.getAsyncRemote().sendText(builder.build().toString());

        // Build ServerUser object
//        ServerUser serverUser = new ServerUser();
//        serverUser.setUser(user);
//        serverUser.setSession(session);
//        serverUser.setIsReady(0);
//
//        // Retrieve room infomation
//        // Need improve with synchronized
//        long roomId = 1l;
//        Room room = null;
//        ServerRoom serverRoom;
//        if (rooms.containsKey(roomId)) {
//            serverRoom = rooms.get(roomId);
//            room = serverRoom.getRoom();
//        } else {
//            serverRoom = new ServerRoom();
//            room = dao.getRoomById(roomId);
//            serverRoom.setRoom(room);
//            rooms.put(roomId, serverRoom);
//        }
//
//        // Retrieve all users in this room
//        List<RoomUserRel> rels = dao.getRoomUserRelByRoomId(roomId);
//        // Build room user relationship
//        RoomUserRel rel = new RoomUserRel();
//        rel.setRoomId(roomId);
//        rel.setUserId(user.getId());
//        rel.setType(1);
//        rel.setIsReady(0);
//        if (rels.isEmpty()) {
//            rel.setPlayerIndex(0);
//            serverRoom.setUser1(serverUser);
//        } else {
//            rel.setPlayerIndex(1);
//            serverRoom.setUser2(serverUser);
//        }
//        
//        sessionRoomMap.put(session.getId(), roomId);
//        
//        // Save room user relationship, represents the user have joined the room
//        dao.insertRoomUserRel(rel);
//        // Send response back
//        String response = Json.createObjectBuilder()
//                .add("event", "login")
//                .add("room", serverRoom.toJSONString())
//                .build().toString();
//        serverRoom.sendMessage(response);
    }

    private void getReady(JsonObject request) {
        Long roomId = request.getJsonNumber("roomId").longValue();
        Long userId = request.getJsonObject("user").getJsonNumber("id").longValue();
        ServerRoom serverRoom = rooms.get(roomId);
        List<RoomUserRel> rels = dao.getRoomUserRelByRoomId(roomId);
        for (RoomUserRel rel : rels) {
            // Update the relationship for request user
            if (userId == rel.getUserId()) {
                rel.setIsReady(1);
                dao.updateRoomUserRel(rel);
            }

            // Maintain server user information
            if (rel.getPlayerIndex() == 0 && serverRoom.getUser1() != null) {
                serverRoom.getUser1().setIsReady(rel.getIsReady());
            }

            if (rel.getPlayerIndex() == 1 && serverRoom.getUser2() != null) {
                serverRoom.getUser2().setIsReady(rel.getIsReady());
            }
        }

        // Send server room information back
        serverRoom.sendMessage(Json.createObjectBuilder()
                .add("event", "getReady")
                .add("room", serverRoom.toJSONString())
                .build().toString());

        if (serverRoom.getUser1().getIsReady() == 1 && serverRoom.getUser2().getIsReady() == 1) {
            ServerGame serverGame = new ServerGame();
            serverGame.setBoardArr(Utils.createBoardArray());
            serverGame.setTurn(0);

            String boardJsonString = Utils.convertBoardArrayToJsonString(serverGame.getBoardArr());
            serverRoom.setGame(serverGame);

            Game game = new Game();
            game.setRoomId(roomId);
            game.setTurn(0);
            game.setInitBoard(boardJsonString);
            game.setCurrentBoard(boardJsonString);
            dao.insertGame(game);

            serverRoom.sendMessage(Json.createObjectBuilder().add("event", "startGame").build().toString());
        }
    }

    private void showChess(JsonObject request) {
        long roomId = request.getJsonNumber("roomId").longValue();
        long userId = request.getJsonObject("user").getJsonNumber("id").longValue();
        int indexX = request.getJsonObject("position").getJsonNumber("indexX").intValue();
        int indexY = request.getJsonObject("position").getJsonNumber("indexY").intValue();

        ServerRoom serverRoom = rooms.get(roomId);
        ServerGame serverGame = serverRoom.getGame();
        int[][] boardArr = serverGame.getBoardArr();
        // Check if the request is valid
        // TODO check user

        // >= 200 means it's not unknown, 0 means not exist
        int chessType = boardArr[indexX][indexY];
        if (chessType >= 200 || chessType == 0) {
            // Handle the invalid request here
        } else {
            serverGame.setTurn(serverGame.getTurn() == 0 ? 1 : 0);
            // Save the chess type to known
            boardArr[indexX][indexY] = chessType + 100;

            serverRoom.sendMessage(Json.createObjectBuilder()
                    .add("event", "updateBoard")
                    .add("subEvent", "showChess")
                    .add("status", "success")
                    .add("nextTurn", serverGame.getTurn())
                    .add("chess", Json.createObjectBuilder()
                            .add("indexX", indexX)
                            .add("indexY", indexY)
                            .add("chessType", chessType - 100)
                            .build())
                    .build().toString());

            // Maintain the game infomation in database
        }
    }

    private void moveChess(JsonObject request) {
        long roomId = request.getJsonNumber("roomId").longValue();
        long userId = request.getJsonObject("user").getJsonNumber("id").longValue();
        int fromX = request.getJsonArray("from").getJsonNumber(0).intValue();
        int fromY = request.getJsonArray("from").getJsonNumber(1).intValue();
        int toX = request.getJsonArray("to").getJsonNumber(0).intValue();
        int toY = request.getJsonArray("to").getJsonNumber(1).intValue();

        ServerRoom serverRoom = rooms.get(roomId);
        ServerGame serverGame = serverRoom.getGame();
        int[][] boardArr = serverGame.getBoardArr();

        // TODO Check if the request is valid
        int from = boardArr[fromX][fromY];
        boardArr[fromX][fromY] = 0;
        boardArr[toX][toY] = from;
        serverGame.setTurn(serverGame.getTurn() == 0 ? 1 : 0);

        serverRoom.sendMessage(Json.createObjectBuilder()
                .add("event", "updateBoard")
                .add("subEvent", "moveChess")
                .add("status", "success")
                .add("nextTurn", serverGame.getTurn())
                .add("from", Json.createArrayBuilder()
                        .add(fromX)
                        .add(fromY)
                        .build())
                .add("to", Json.createArrayBuilder()
                        .add(toX)
                        .add(toY)
                        .build())
                .build().toString());

        // Maintain the game infomation in database
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
