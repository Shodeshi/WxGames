/**
 * Created by Shodeshi on 8/21/2014.
 */
var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        this.addChild(new BackGroundLayer());
        this.addChild(new GameLayer());
    }
});