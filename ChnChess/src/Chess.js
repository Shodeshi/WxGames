/**
 * Created by tyang on 2014/11/28.
 */
var Chess = cc.Class.extend({
    sprite: null,
    chessType: null,
    indexX:null,
    indexY:null,
    isSelected: null,

    ctor: function (indexX, indexY, chessType) {
        this.chessType = chessType;
        this.indexX = indexX;
        this.indexY = indexY;
        this.isSelected = false;

        this.sprite = cc.Sprite.create(chessType["sprite"]);
        this.sprite.x = START_X + indexX * DISTANCE;
        this.sprite.y = START_Y + indexY * DISTANCE;

//        var selfPointer = this;
//        var listener = cc.EventListener.create({
//            event: cc.EventListener.TOUCH_ONE_BY_ONE,
//            swallowTouches: true,
//            onTouchBegan: function (touch, event) {
//                if(Game.status != STARTED || Game.myTurn != Game.nextTurn)
//                    return false;
//
//                var locationInNode = selfPointer.sprite.convertToNodeSpace(touch.getLocation());
//                var s = selfPointer.sprite.getContentSize();
//                var rect = cc.rect(0, 0, s.width, s.height);
//
//                if (cc.rectContainsPoint(rect, locationInNode)) {
//                    cc.log("Touching :" + selfPointer.indexX + ", " + selfPointer.indexY);
//                    selfPointer.sprite.parent.touchChess(selfPointer.indexX, selfPointer.indexY);
//                    return true;
//                }else{
//                    selfPointer.isSelected = false;
//                    return false;
//                }
//            }
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
//        });

//        cc.eventManager.addListener(listener, this.sprite);
    },

    addToParent: function(parent){
        parent.addChild(this.sprite);
        parent.addChild(this.selectedSprite);
    },

    showChess: function(chessType){
        var type;
        switch(chessType){
            case ChessType.bjiang.index:
                type = ChessType.bjiang;
                break;
            case ChessType.bche.index:
                type = ChessType.bche;
                break;
            case ChessType.bma.index:
                type = ChessType.bma;
                break;
            case ChessType.bpao.index:
                type = ChessType.bpao;
                break;
            case ChessType.bxiang.index:
                type = ChessType.bxiang;
                break;
            case ChessType.bshi.index:
                type = ChessType.bshi;
                break;
            case ChessType.bzu.index:
                type = ChessType.bzu;
                break;
            case ChessType.rshuai.index:
                type = ChessType.rshuai;
                break;
            case ChessType.rche.index:
                type = ChessType.rche;
                break;
            case ChessType.rma.index:
                type = ChessType.rma;
                break;
            case ChessType.rpao.index:
                type = ChessType.rpao;
                break;
            case ChessType.rxiang.index:
                type = ChessType.rxiang;
                break;
            case ChessType.rshi.index:
                type = ChessType.rshi;
                break;
            case ChessType.rzu.index:
                type = ChessType.rzu;
                break;
        }

        this.chessType = type;
        this.sprite.setTexture(type["sprite"]);
        this.sprite.setScale(0.5);
    },

    moveTo: function(x, y){
        this.sprite.x = x;
        this.sprite.y = y;
    },

    moveToIndex: function(indexX, indexY){
        this.sprite.x = START_X + indexX * DISTANCE;
        this.sprite.y = START_Y + indexY * DISTANCE;
    },

    destroy: function(){
        this.sprite.removeFromParent();
        this.sprite = undefined;
    }
});