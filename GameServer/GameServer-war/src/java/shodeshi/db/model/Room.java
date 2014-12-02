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
public class Room {

    private Long id;
    private Long playerId1;
    private Long playerId2;
    private Integer isReady1;
    private Integer isReady2;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlayerId1() {
        return playerId1;
    }

    public void setPlayerId1(Long playerId1) {
        this.playerId1 = playerId1;
    }

    public Long getPlayerId2() {
        return playerId2;
    }

    public void setPlayerId2(Long playerId2) {
        this.playerId2 = playerId2;
    }

    public Integer getIsReady1() {
        return isReady1;
    }

    public void setIsReady1(Integer isReady1) {
        this.isReady1 = isReady1;
    }

    public Integer getIsReady2() {
        return isReady2;
    }

    public void setIsReady2(Integer isReady2) {
        this.isReady2 = isReady2;
    }
}
