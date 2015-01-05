/**
 * Created by tyang on 2014/11/28.
 */
var Chess = cc.Class.extend({
    sprite: null,
    chessType: null,
    indexX: null,
    indexY: null,
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

    addToParent: function (parent) {
        parent.addChild(this.sprite);
        parent.addChild(this.selectedSprite);
    },

    showChess: function (chessType) {
        var type;
        switch (chessType) {
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

    moveTo: function (x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    },

    moveToIndex: function (indexX, indexY) {
        this.sprite.x = START_X + indexX * DISTANCE;
        this.sprite.y = START_Y + indexY * DISTANCE;
    },

    isValidMoving: function (indexX, indexY, boardArr) {
        var moveX = indexX - this.indexX;
        var moveY = indexY - this.indexY;
        switch (this.chessType.index % 10) {
            // 将
            case 1:
                if ((Math.abs(moveX) == 1 && moveY == 0) || (Math.abs(moveY) == 1 && moveX == 0))
                    return true;
                else
                    return false;
                break;
            // 车
            case 2:
                if ((Math.abs(moveX) > 0 && moveY == 0) || (Math.abs(moveY) > 0 && moveX == 0))
                    return true;
                else
                    return false;
                break;
            // 马
            case 3:
                if (Math.abs(moveX * moveY) == 2
                    && ((moveX == 2 && boardArr[this.indexX + 1][this.indexY] == 0)
                    || (moveX == -2 && boardArr[this.indexX - 1][this.indexY] == 0)
                    || (moveY == 2 && boardArr[this.indexX][this.indexY + 1] == 0)
                    || (moveY == -2 && boardArr[this.indexX][this.indexY - 1] == 0)))
                    return true;
                else
                    return false;
                break;
            // 炮
            case 4:
                if (Math.abs(moveX) > 0 && moveY == 0) {
                    var startIndex;
                    var endIndex;
                    var count = 0;
                    if (moveX > 0) {
                        startIndex = this.indexX + 1;
                        endIndex = indexX - 1;
                    }
                    else {
                        startIndex = indexX + 1;
                        endIndex = this.indexX - 1;
                    }
                    for (var i = startIndex; i <= endIndex; i++) {
                        if (boardArr[i][this.indexY] != 0)
                            count++;
                    }
                    if (count == 1)
                        return true;
                    else
                        return false;
                }
                else if (Math.abs(moveY) > 0 && moveX == 0) {
                    var startIndex;
                    var endIndex;
                    var count = 0;
                    if (moveY > 0) {
                        startIndex = this.indexY + 1;
                        endIndex = indexY - 1;
                    }
                    else {
                        startIndex = indexY + 1;
                        endIndex = this.indexY - 1;
                    }
                    for (var i = startIndex; i <= endIndex; i++) {
                        if (boardArr[this.indexX][i] != 0)
                            count++;
                    }
                    if (count == 1 || count == 0)
                        return true;
                    else
                        return false;
                }
                else
                    return false;
                break;
            // 象
            case 5:
                if (Math.abs(moveX) == 2 && Math.abs(moveY) == 2 && boardArr[this.indexX + 2 / moveX][this.indexY + 2 / moveY] == 0)
                    return true;
                else
                    return false;
                break;
            // 士
            case 6:
                if (Math.abs(moveX) == 1 && Math.abs(moveY) == 1)
                    return true;
                else
                    return false;
                break;
            // 卒
            case 7:
                if ((Math.abs(moveX) == 1 && moveY == 0)
                    // 黑棋向上
                    || (moveY == 1 && moveX == 0 && this.chessType.index == 17)
                    // 白棋向下
                    || (moveY == -1 && moveX == 0 && this.chessType.index == 27))
                    return true;
                else
                    return false;
                break;
        }

    },

    destroy: function () {
        this.sprite.removeFromParent();
        this.sprite = undefined;
    }
});