/**
 * Created by tyang on 8/22/2014.
 */
var MenuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        this.addChild(new BackGroundLayer());

        var startItem = cc.MenuItemFont.create("开始游戏", function(sender) {
            cc.director.runScene(new GameScene());
        }, this);
        startItem.fontSize = 20;
        startItem.fontName = "黑体";
        startItem.color = cc.color(255,255,255);

        var menu = cc.Menu.create(startItem);
        menu.x = cc.winSize.width/2;
        menu.y = cc.winSize.height/2;
        this.addChild(menu);
    }
})