/**
 * Created by Shodeshi on 8/21/2014.
 */
var BackGroundLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
        this.init();
    },
    init : function(){
      //  this._super(cc.color(255, 255, 255, 180));
        this.setBackGroundColor(cc.color(255, 255, 255, 180));
    }
});