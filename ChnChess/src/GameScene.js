/**
 * Created by Shodeshi on 2014/11/27.
 */
var GameScene = cc.Scene.extend({
    myUserName: null,
    gameLayer: null,
    whoAmI: null,
    roomId: null,
    // Save the join room response
    response: null,

    ctor: function (response) {
        this._super();
        this.response = response
    },

    onEnter: function () {
        this._super();
        this.gameLayer = new GameLayer();
        this.addChild(new BackGroundLayer());
        this.addChild(this.gameLayer);
        Game.status = WAITING;

        // Init the room info
        var room = this.response["room"];
        this.roomId = room["id"];

        // Register join room event for other players
        var joinRoomCallBack = new Object();
        var that = this;
        joinRoomCallBack["func"] = function(response){
            that.updateRoomInfo(response["room"]);
        };
        WSController.registerEvent("joinRoom", joinRoomCallBack);

        // Register get ready event
        var callbackObj = new Object();
        callbackObj["obj"] = this;
        callbackObj["func"] = this.getReadySuccess;
        WSController.registerEvent("getReady", callbackObj);

        // Register start game event
        var startGameCallBackObj = new Object();
        startGameCallBackObj["obj"] = this;
        startGameCallBackObj["func"] = this.startGame;

        WSController.registerEvent("startGame", startGameCallBackObj);

        this.gameLayer.addGetReadyBtn(callbackObj);

        this.updateRoomInfo(room);
    },

    loginSuccess: function (response) {
        var room = response["room"];
        this.roomId = room["id"];

        // When this is the response for myself, add get ready button
        if (!this.whoAmI) {
            // Register get ready event, in case the other user get ready at first
            var callbackObj = new Object();
            callbackObj["obj"] = this;
            callbackObj["func"] = this.getReadySuccess;
            WSController.registerEvent("getReady", callbackObj);

            // Register start game event
            var startGameCallBackObj = new Object();
            startGameCallBackObj["obj"] = this;
            startGameCallBackObj["func"] = this.startGame;

            WSController.registerEvent("startGame", startGameCallBackObj);

            this.gameLayer.addGetReadyBtn(callbackObj);
        }

        this.updateRoomInfo(room);
    },

    updateRoomInfo: function (room) {
        if (room["player1"]) {
            var player1 = room["player1"];
            this.gameLayer.updatePlayerName(1, player1["name"]);
            this.gameLayer.updatePlayerStatus(1, player1["isReady"] == 1 ? "已准备" : "未准备")

            if (player1["name"] == Game.myUserObj["name"]){
                Game.myTurn = 0;
//                this.whoAmI = player1;
            }
        }

        if (room["player2"]) {
            var player2 = room["player2"];
            this.gameLayer.updatePlayerName(2, player2["name"]);
            this.gameLayer.updatePlayerStatus(2, player2["isReady"] == 1 ? "已准备" : "未准备")

            if (player2["name"] == Game.myUserObj["name"]){
                Game.myTurn = 1
//                this.whoAmI = player2;
            }
        }
    },

    getReadySuccess: function (response) {
        this.updateRoomInfo(response["room"]);
    },

    startGame: function (response) {
        WSController.removeEvent("startGame")
        Game.status = STARTED;
        Game.nextTurn = 0;

        var callbackObj = new Object();
        callbackObj["obj"] = this.gameLayer;
        callbackObj["func"] = this.gameLayer.updateBoard;
        WSController.registerEvent("updateBoard", callbackObj);
    }
});