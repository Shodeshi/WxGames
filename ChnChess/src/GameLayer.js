/**
 * Created by tyang on 2014/11/28.
 */
var GameLayer = cc.Layer.extend({
    // 棋盘数组
    boardArr: null,
    blackPlayerLabel: null,
    redPlayerLabel: null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        // 初始化棋盘数组
        this.boardArr = new Array();
        for (var i = 0; i < 9; i++) {
            this.boardArr[i] = new Array();
            for (var j = 0; j < 10; j++) {
                this.boardArr[j] = 0;
            }
        }

        var board = cc.Sprite.create(res.chessBoard);
        board.anchorX = 0;
        board.anchorY = 0;
        this.addChild(board);

        for(var i=0;i<initArr.length;i++){

            var indexX = initArr[i][0];
            var indexY = initArr[i][1];

            var chess = new Chess(indexX, indexY, ChessType.unknown);
            this.boardArr[indexX][indexY] = chess;
            this.addChild(chess.sprite);
        }

        this.blackPlayerLabel = cc.LabelTTF.create("黑方: ", "黑体", 25);
        this.blackPlayerLabel.x = board.x + board.width + 40;
        this.blackPlayerLabel.y = 10;
        this.addChild(this.blackPlayerLabel);

        this.redPlayerLabel = cc.LabelTTF.create("红方: ", "黑体", 25);
        this.redPlayerLabel.x = board.x + board.width + 40;
        this.redPlayerLabel.y = cc.winSize.height - this.redPlayerLabel.height;
        this.addChild(this.redPlayerLabel);
//        var chess = cc.Sprite.create(res.emptyChess);
//        chess.set
//        chess.x = 32;
//        chess.y = 18;
//        this.addChild(chess);
    }
});