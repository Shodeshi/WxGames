/**
 * Created by Shodeshi on 8/21/2014.
 */
var BackGroundLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
        this.init();
    },
    init : function(){
        this._super();
        var bg = cc.Sprite.create(res.bg);
        bg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
        });
        this.addChild(bg);
    }
});