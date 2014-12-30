/**
 * Created by tyang on 2014/12/29.
 */
var RoomLayer = cc.LayerColor.extend({
    id:null,
    playerCount:null,
    playerCountLabel:null,

    ctor: function (id) {
        this._super(cc.color(255, 153, 0, 230), cc.winSize.width/2 - 10, cc.winSize.height/5 - 10);

        this.id = id;
        this.init();
    },

    init: function(){
        var roomTitleLabel = cc.LabelTTF.create("房间" + this.id, "黑体", 15);
        roomTitleLabel.anchorX = 0;
        roomTitleLabel.anchorY = 1;
        roomTitleLabel.x = 5;
        roomTitleLabel.y = this.height - 5;
        this.addChild(roomTitleLabel);

        this.playerCountLabel = cc.LabelTTF.create("人数：0/2", "黑体", 15);
        this.playerCountLabel.anchorX = 0;
        this.playerCountLabel.anchorY = 0;
        this.playerCountLabel.x = 5;
        this.playerCountLabel.y = 5;
        this.addChild(this.playerCountLabel);

        var startItem = cc.MenuItemFont.create("加入", this.joinRoomRequest, this);
        startItem.fontSize = 15;
        startItem.fontName = "黑体";
        startItem.color = cc.color(255, 255, 255);

        var menu = new cc.Menu(startItem);
//        menu.anchorX = 1;
//        menu.anchorY = 0;
        menu.x = this.width - 18;
        menu.y = 14;
        this.addChild(menu);
    },

    joinRoomRequest: function(){
        var callBack = new Object();
        callBack["func"] = function(response){
            WSController.removeEvent("updateRoomInfo");
            WSController.removeEvent("joinRoom");
            cc.director.runScene(new GameScene(response));
        };
        WSController.registerEvent("joinRoom", callBack);

        var request = new Object();
        request["event"] = "joinRoom";
        request["roomId"] = this.id;
        request["user"] = Game.myUserObj;

        WSController.sendMessage(JSON.stringify(request));
    },

    updateRoomInfo: function(playerCount){
        this.playerCount = playerCount;
        this.playerCountLabel.setString("人数：" + this.playerCount +"/2");
    }
});