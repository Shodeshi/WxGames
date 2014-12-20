/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package shodeshi.websocket.server.model;

import shodeshi.db.model.Game;

/**
 *
 * @author tyang
 */
public class ServerGame {
    private Game game;
    private int[][] boardArr;
    private int turn;

    public int[][] getBoardArr() {
        return boardArr;
    }

    public void setBoardArr(int[][] boardArr) {
        this.boardArr = boardArr;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public int getTurn() {
        return turn;
    }

    public void setTurn(int turn) {
        this.turn = turn;
    }
}
