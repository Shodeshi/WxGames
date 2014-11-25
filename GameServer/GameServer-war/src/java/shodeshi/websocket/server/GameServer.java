/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package shodeshi.websocket.server;

import java.io.IOException;
import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author tyang
 */
@ServerEndpoint("/server")
public class GameServer {
    
    @OnMessage
    public void onMessage(String message, Session session)
            throws IOException, InterruptedException {
        JsonObjectBuilder responseBuilder = Json.createObjectBuilder();
        String response = responseBuilder.add("event", "login").build().toString();
        sendToOne(session, response);
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
