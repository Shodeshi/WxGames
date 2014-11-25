/**
 * Created by tyang on 8/22/2014.
 */
var BackGroundLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super(cc.color(0, 206, 209, 230), cc.winSize.width, cc.winSize.height);
    }
});