/**
 * Created by tyang on 8/22/2014.
 */
var Item = cc.Class.extend({
    sprite: null,
    spriteTag: null,
    content:null,
    ctor: function (parent, spriteTag, x, y) {
        this.sprite = cc.Sprite.create(res.itemBg);
        this.sprite.setPosition(cc.p(x, y));
        parent.addChild(this.sprite);

        this.spriteTag = spriteTag;

        if(SpriteTag.itemTagB == this.spriteTag)
            this.content = cc.Sprite.create(res.itemB);
        else
            this.content = cc.Sprite.create(res.itemA);
        this.content.anchorX = 0.5;
        this.content.anchorY = 0.5;
        this.content.x = x;
        this.content.y = y;
        parent.addChild(this.content);
    },
    init: function(){

    },
    removeFromParent: function () {
        this.sprite.removeFromParent();
        this.sprite = null;

        this.content.removeFromParent();
        this.content = null;
    }
});