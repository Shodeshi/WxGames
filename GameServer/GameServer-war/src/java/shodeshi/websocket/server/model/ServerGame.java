/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package shodeshi.websocket.server.model;

import shodeshi.db.model.Room;

/**
 *
 * @author tyang
 */
public class ServerGame {
    private Room room;
    private int[][] boardArr;

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public int[][] getBoardArr() {
        return boardArr;
    }

    public void setBoardArr(int[][] boardArr) {
        this.boardArr = boardArr;
    }

    
}
