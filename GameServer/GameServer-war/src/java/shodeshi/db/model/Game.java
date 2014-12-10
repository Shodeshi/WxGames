/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package shodeshi.db.model;

/**
 *
 * @author tyang
 */
public class Game {
    private long id;
    private long roomId;
    private String initBoard;
    private String currentBoard;
    private int turn;
    private String moves;
    private long winner;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRoomId() {
        return roomId;
    }

    public void setRoomId(long roomId) {
        this.roomId = roomId;
    }

    public String getInitBoard() {
        return initBoard;
    }

    public void setInitBoard(String initBoard) {
        this.initBoard = initBoard;
    }

    public String getCurrentBoard() {
        return currentBoard;
    }

    public void setCurrentBoard(String currentBoard) {
        this.currentBoard = currentBoard;
    }

    public int getTurn() {
        return turn;
    }

    public void setTurn(int turn) {
        this.turn = turn;
    }

    public String getMoves() {
        return moves;
    }

    public void setMoves(String moves) {
        this.moves = moves;
    }

    public long getWinner() {
        return winner;
    }

    public void setWinner(long winner) {
        this.winner = winner;
    }
    
    
    
}
