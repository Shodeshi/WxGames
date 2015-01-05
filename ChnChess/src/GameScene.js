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
    resetResponse: null,

    ctor: function (response) {
        this._super();
        this.response = response
    },

    onEnter: function () {
        this._super();
        // Init the room info
        var room = this.response["room"];
        this.roomId = room["id"];
        Game.status = WAITING;

        this.gameLayer = new GameLayer(this.roomId);
        this.addChild(new BackGroundLayer());
        this.addChild(this.gameLayer);

        // Register join room event for other players
        var joinRoomCallBack = new Object();
        var that = this;
        joinRoomCallBack["func"] = function (response) {
            that.updateRoomInfo(response["room"]);
        };
        WSController.registerEvent("joinRoom", joinRoomCallBack);

        // Register get ready event
        var callbackObj = new Object();
        callbackObj["obj"] = this;
        callbackObj["func"] = this.getReadySuccess;
        WSController.registerEvent("getReady", callbackObj);

        // Register use exit event
        var userExitCallBackObj = new Object();
        userExitCallBackObj["obj"] = this;
        userExitCallBackObj["func"] = this.userExit;
        WSController.registerEvent("userExit", userExitCallBackObj);

        // Register start game event
        var startGameCallBackObj = new Object();
        startGameCallBackObj["obj"] = this;
        startGameCallBackObj["func"] = this.startGame;
        WSController.registerEvent("startGame", startGameCallBackObj);

        // Register reset game event
        var resetGameCallBackObj = new Object();
        resetGameCallBackObj["obj"] = this;
        resetGameCallBackObj["func"] = this.resetNotification;
        WSController.registerEvent("resetGame", resetGameCallBackObj);

        this.gameLayer.addGetReadyBtn();

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

            if (player1["name"] == Game.myUserObj["name"]) {
                Game.myTurn = 0;
//                this.whoAmI = player1;
            }
        }
        else {
            this.gameLayer.updatePlayerName(1, "");
            this.gameLayer.updatePlayerStatus(1, "未准备")
        }

        if (room["player2"]) {
            var player2 = room["player2"];
            this.gameLayer.updatePlayerName(2, player2["name"]);
            this.gameLayer.updatePlayerStatus(2, player2["isReady"] == 1 ? "已准备" : "未准备")

            if (player2["name"] == Game.myUserObj["name"]) {
                Game.myTurn = 1
//                this.whoAmI = player2;
            }
        }
        else {
            this.gameLayer.updatePlayerName(2, "");
            this.gameLayer.updatePlayerStatus(2, "未准备")
        }
    },

    getReadySuccess: function (response) {
        this.updateRoomInfo(response["room"]);
    },

    startGame: function (response) {
        WSController.removeEvent("startGame")
        Game.status = STARTED;
        Game.nextTurn = 0;

        var that = this;
        var callbackObj = new Object();
        callbackObj["obj"] = this.gameLayer;
        callbackObj["func"] = that.gameLayer.updateBoard;
        WSController.registerEvent("updateBoard", callbackObj);
    },

    resetNotification: function (response) {
        // Reset all status variables at first
        Game.status = WAITING;
        Game.nextTurn = -1;
        Game.myTurn = -1;

        var notificationCallBack = new Object();
        notificationCallBack["obj"] = this;
        notificationCallBack["func"] = this.resetGame;
        notificationCallBack["params"] = [response];

        this.addChild(new NotificationLayer(response["message"], notificationCallBack));
    },

    resetGame: function (response) {
        while (this.gameLayer.isMoving == 1) {
            cc.log("waiting...");
        }

        var startGameCallBackObj = new Object();
        startGameCallBackObj["obj"] = this;
        startGameCallBackObj["func"] = this.startGame;
        WSController.registerEvent("startGame", startGameCallBackObj);

        this.gameLayer.reset();
        this.updateRoomInfo(response["room"]);
        this.gameLayer.addGetReadyBtn();
        this.resetResponse = undefined;
    },

    userExit: function(response){
        var notificationCallBack = new Object();
        var that = this;
        notificationCallBack["func"] = function(response){
            that.updateRoomInfo(response["room"]);
        };
        notificationCallBack["params"] = [response];

        this.addChild(new NotificationLayer(response["message"], notificationCallBack));
    }
});