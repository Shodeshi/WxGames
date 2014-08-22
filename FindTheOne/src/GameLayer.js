/**
 * Created by tyang on 8/22/2014.
 */
var GameLayer = cc.Layer.extend({
    xNum:null,
    yNum:null,
    startX:null,
    startY:null,
    endX:null,
    endY:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.xNum = 3;
        this.yNum = 3;
        this.startX = cc.winSize.width/2 - (this.xNum * itemWidth)/2;
        this.startY = cc.winSize.height/2 - (this.yNum * itemHeight)/2;
        this.endX = this.startX + this.xNum * itemWidth;
        this.endY = this.startY + this.yNum * itemHeight;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var item = new Item(this, SpriteTag.trueItem, (i + 0.5) * itemWidth + this.startX, (j + 0.5) * itemHeight + this.startY);
                this.addChild(item);
            }
        }

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchEnded: this.onTouchEnded
        }, this)
    },
    onTouchBegan: function (touch, event) {

        var target = event.getCurrentTarget();
        var touchX = touch.getLocation().x;
        var touchY = touch.getLocation().y;
        if(touchX >= target.startX && touchX <= target.endX && touchY >= target.startY && touchY <= target.endY){
            var positionX = Math.floor((touchX - target.startX)/itemWidth);
            var positionY = Math.floor((touchY - target.startY)/itemHeight);
            cc.log("touching " + positionX + ", " + positionY);
        }

        return true;
    },
    onTouchEnded: function (touch, event) {
    }
});