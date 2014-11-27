/**
 * Created by Shodeshi on 2014/11/27.
 */
var GameScene = cc.Scene.extend({
    myUserName: null,

    ctor: function (userName) {
        this._super();

        this.myUserName = userName;
    },

    onEnter: function () {
        this._super();
        this.addChild(new BackGroundLayer());

        // Build parameter for login request
        var params = new Object();
        params.userName = this.myUserName;
        params.callback = this.loginSuccess;

        // Init WebSocket, send login request after connected
        WSController.init(this.loginRequest, params);
    },
    loginRequest: function (params) {
        // Build login request json object
        var request = new Object();
        request.event = "login";
        request.userName = params.userName;

        // Register the login event
        WSController.registerEvent("login", params.callback);
        // Send login request to server
        WSController.sendMessage(JSON.stringify(request));
    },
    loginSuccess: function () {
        cc.log("Game scene login success");
    }
});