/**
 * Created by tyang on 8/22/2014.
 */
var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new BackGroundLayer());

        var startItem = cc.MenuItemFont.create("开始游戏", function (sender) {
//            cc.director.runScene(new GameScene(input.getStr()));
            // Build login request json object
            var request = new Object();
            request["event"] = "login";
            request["userName"] = input.getStr();

            var callback = new Object();
            callback["func"] = function (response) {
                Game.myUserObj = response["user"];
                cc.director.runScene(new RoomScene());
            };

            // Register the login event
            WSController.registerEvent("login", callback);
            // Send login request to server
            WSController.sendMessage(JSON.stringify(request));

        }, this);
        startItem.fontSize = 45;
        startItem.fontName = "黑体";
        startItem.color = cc.color(255, 255, 255);
        startItem.enabled = false;

        var menu = new cc.Menu(startItem);
        menu.x = cc.winSize.width / 2;
        menu.y = cc.winSize.height / 2;
//        this.addChild(menu);

        var callback = new Object();
        var that = this;
        callback["func"] = function () {
            that.addChild(menu);
        };
        callback["obj"] = this;
        WSController.init(callback);

        var input = new InputLayer("请输入昵称");
        input.setEnableBtn(startItem);
        this.addChild(input);
    }
})