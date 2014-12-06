/**
 * Created by Shodeshi on 2014/11/27.
 */
var GameScene = cc.Scene.extend({
    myUserName: null,
    gameLayer: null,
    whoAmI: null,
    roomId: null,

    ctor: function (userName) {
        this._super();

        this.myUserName = userName;
    },

    onEnter: function () {
        this._super();
        this.gameLayer = new GameLayer();
        this.addChild(new BackGroundLayer());
        this.addChild(this.gameLayer);

        // Build parameter for login request
//        var params = new Object();
//        params.userName = this.myUserName;
//        params.callback = this.loginSuccess;

        var callback = new Object();
        callback.func = this.loginRequest;
        callback.obj = this;

        // Init WebSocket, send login request after connected
        WSController.init(callback);
    },
    loginRequest: function () {
        // Build login request json object
        var request = new Object();
        request.event = "login";
        request.userName = this.myUserName;

        var callback = new Object();
        callback.func = this.loginSuccess;
        callback.obj = this;

        // Register the login event
        WSController.registerEvent("login", callback);
        // Send login request to server
        WSController.sendMessage(JSON.stringify(request));
    },
    loginSuccess: function (response) {
        var room = JSON.parse(response["room"]);
        this.roomId = room["id"];
        this.updateRoomInfo(room);

        // Register get ready event, in case the other user get ready at first
        var callbackObj = new Object();
        callbackObj.obj = this;
        callbackObj.func = this.getReadySuccess;
        WSController.registerEvent("getReady", callbackObj);

        this.gameLayer.addGetReadyBtn(callbackObj);
    },

    updateRoomInfo: function (room) {
        if (room["player1"]) {
            var player1 = JSON.parse(room["player1"]);
            this.gameLayer.updatePlayerName(1, player1["name"]);
            this.gameLayer.updatePlayerStatus(1, player1["isReady"] == 1 ? "已准备" : "未准备")

            if (player1["name"] == this.myUserName)
                this.whoAmI = player1;
        }

        if (room["player2"]) {
            var player2 = JSON.parse(room["player2"]);
            this.gameLayer.updatePlayerName(2, player2["name"]);
            this.gameLayer.updatePlayerStatus(2, player2["isReady"] == 1 ? "已准备" : "未准备")

            if (player2["name"] == this.myUserName)
                this.whoAmI = player2;
        }
    },

    getReadySuccess: function (response) {
        this.updateRoomInfo(JSON.parse(response["room"]));
    }
});