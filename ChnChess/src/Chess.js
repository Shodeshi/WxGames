/**
 * Created by tyang on 2014/11/28.
 */
var Chess = cc.Class.extend({
    sprite: null,
    chessType: null,
    ctor: function (indexX, indexY, chessType) {
        this.chessType = chessType;

        this.sprite = cc.Sprite.create(chessType.sprite);
        this.sprite.x = 32 + indexX * 32;
        this.sprite.y = 18 + indexY * 32;
    },

    addToParent: function(parent){
        parent.addChild(this.sprite);
    }
});