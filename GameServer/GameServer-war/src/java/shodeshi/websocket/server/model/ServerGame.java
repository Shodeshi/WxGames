/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package shodeshi.websocket.server.model;

import javax.json.JsonArray;
import shodeshi.db.model.Room;

/**
 *
 * @author tyang
 */
public class ServerGame {
    private Room room;
    private JsonArray boardArr;

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public JsonArray getBoardArr() {
        return boardArr;
    }

    public void setBoardArr(JsonArray boardArr) {
        this.boardArr = boardArr;
    }
    
}
