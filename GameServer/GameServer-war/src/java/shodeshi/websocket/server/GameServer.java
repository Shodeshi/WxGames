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
import shodeshi.controller.GameController;
import shodeshi.db.DefaultGameDAO;
import shodeshi.db.GameDAO;
import shodeshi.db.model.User;

/**
 *
 * @author tyang
 */
@ServerEndpoint("/server")
public class GameServer {

    @OnMessage
    public void onMessage(String message, Session session)
            throws IOException, InterruptedException {
        GameController.getInstance().processRequest(message, session);
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
}
