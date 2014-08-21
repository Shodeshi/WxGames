/**
 * Created by tyang on 8/21/2014.
 */
var Pakemon = cc.Class.extend({
    sprite: null,
    ctor: function (parent, x, y) {
        this.sprite = cc.Sprite.create(res.p2r1);
        this.sprite.setPosition(cc.p(x, y));
        parent.addChild(this.sprite);
    },
    removeFromParent: function () {
        this.sprite.removeFromParent();
        this.sprite = null;
    }
});