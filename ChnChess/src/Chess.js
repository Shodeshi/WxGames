/**
 * Created by tyang on 2014/11/28.
 */
var Chess = cc.Class.extend({
    sprite: null,
    chessType: null,
    indexX:null,
    indexY:null,

    ctor: function (indexX, indexY, chessType) {
        this.chessType = chessType;
        this.indexX = indexX;
        this.indexY = indexY;

        this.sprite = cc.Sprite.create(chessType["sprite"]);
        this.sprite.x = 32 + indexX * 32;
        this.sprite.y = 18 + indexY * 32;

        var selfPointer = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var locationInNode = selfPointer.sprite.convertToNodeSpace(touch.getLocation());
                var s = selfPointer.sprite.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("Touching :" + selfPointer.indexX + ", " + selfPointer.indexY);
                    return true;
                }
                return false;
            }
//            onTouchMoved: function (touch, event) {
//                //this.setPosition(this.getPosition() + touch.getDelta());
//            },
//            onTouchEnded: function (touch, event) {
//                selfPointer.setColor(cc.color.WHITE);
//                if(selfPointer._removeListenerOnTouchEnded) {
//                    cc.eventManager.removeListener(selfPointer._listener);
//                    selfPointer._listener = null;
//                }
//            }
        });

        cc.eventManager.addListener(listener, this.sprite);
    },

    addToParent: function(parent){
        parent.addChild(this.sprite);
    }
});