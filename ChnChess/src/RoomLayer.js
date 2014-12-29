/**
 * Created by tyang on 2014/12/29.
 */
var RoomLayer = cc.LayerColor.extend({
    id:null,
    playerCount:null,

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

        var playerCountLabel = cc.LabelTTF.create("人数：0/2", "黑体", 15);
        playerCountLabel.anchorX = 0;
        playerCountLabel.anchorY = 0;
        playerCountLabel.x = 5;
        playerCountLabel.y = 5;
        this.addChild(playerCountLabel);

        var that = this;
        var startItem = cc.MenuItemFont.create("加入房间", function (sender) {
            var callBack = new Object();
            callBack["func"] = function(){

            };

            var request = new Object();
            request["event"] = "joinRoom";
            request["roomId"] = that.id;
            request["user"] = Game.myUserObj;

        }, this);
        startItem.fontSize = 45;
        startItem.fontName = "黑体";
        startItem.color = cc.color(255, 255, 255);
        startItem.enabled = false;

        var menu = new cc.Menu(startItem);
        menu.x = cc.winSize.width / 2;
        menu.y = cc.winSize.height / 2;
    }
});