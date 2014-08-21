/**
 * Created by tyang on 8/21/2014.
 */
var GameLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
        this.init();
    },
    init:function(){
        var p1 = new Pakemon(this, 112, 200);
    }
});