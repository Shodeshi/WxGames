/**
 * Created by tyang on 8/22/2014.
 */
var Item = cc.Class.extend({
    sprite: null,
    spriteTag: null,
    ctor: function (parent, spriteTag, x, y) {
        this.sprite = cc.Sprite.create(res.itemBg);
        this.sprite.setPosition(cc.p(x, y));
        parent.addChild(this.sprite);

        this.spriteTag = spriteTag;
    },
    init: function(){

    },
    removeFromParent: function () {
        this.sprite.removeFromParent();
        this.sprite = null;
    }
});