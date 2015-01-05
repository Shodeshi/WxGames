/**
 * Created by Shodeshi on 2015/1/2.
 */
var NotificationLayer = cc.LayerColor.extend({
    str:null,
    callback:null,

    ctor: function (str, callback) {
        this.str = str;
        this.callback = callback;
        this._super(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height);
    },

    onEnter: function(){
        this._super();

        var draw = new cc.DrawNode();
        this.addChild(draw);
        var winSize = cc.director.getWinSize();

        draw.drawRect(cc.p(winSize.width / 4, winSize.height / 4 * 3), cc.p(winSize.width / 4 * 3, winSize.height / 4), cc.color(255, 153, 0, 255), 2, cc.color(0, 0, 0, 255));

        var notification = cc.LabelTTF.create(this.str, "黑体", 30);
        notification.anchorX = 0.5;
        notification.anchorY = 0.5;
        notification.x = winSize.width / 2;
        notification.y = winSize.height / 8 * 5;
        this.addChild(notification);

        var that = this;
        var startItem = cc.MenuItemFont.create("确定", function(){
            that.removeFromParent();
            that.callback["func"].apply(that.callback["obj"], that.callback["params"]);
        }, this);
        startItem.fontSize = 20;
        startItem.fontName = "黑体";
        startItem.color = cc.color(255, 255, 255);

        var menu = new cc.Menu(startItem);
        menu.x = cc.winSize.width / 2;
        menu.y = cc.winSize.height / 8 * 3;
        this.addChild(menu);

    }
});