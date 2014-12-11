/**
 * Created by tyang on 2014/11/28.
 */
var GameLayer = cc.Layer.extend({
    // 棋盘数组
    boardArr: null,
    blackPlayerLabel: null,
    blackPlayerStatus: null,
    redPlayerLabel: null,
    redPlayerStatus: null,
    getReadyMenu: null,

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

        for (var i = 0; i < initArr.length; i++) {

            var indexX = initArr[i][0];
            var indexY = initArr[i][1];

            var chess = new Chess(indexX, indexY, ChessType.unknown);
            this.boardArr[indexX][indexY] = chess;
            this.addChild(chess.sprite);
        }

        this.blackPlayerLabel = cc.LabelTTF.create("黑方: ", "黑体", 15);
        this.blackPlayerLabel.anchorX = 0;
        this.blackPlayerLabel.anchorY = 0;
        this.blackPlayerLabel.x = board.x + board.width + 5;
        this.blackPlayerLabel.y = 10;
        this.addChild(this.blackPlayerLabel);

        this.redPlayerLabel = cc.LabelTTF.create("红方: ", "黑体", 15);
        this.redPlayerLabel.anchorX = 0;
        this.redPlayerLabel.anchory = 0;
        this.redPlayerLabel.x = board.x + board.width + 5;
        this.redPlayerLabel.y = cc.winSize.height - this.redPlayerLabel.height;
        this.addChild(this.redPlayerLabel);

        this.blackPlayerStatus = cc.LabelTTF.create("未准备", "黑体", 15);
        this.blackPlayerStatus.anchorX = 0;
        this.blackPlayerStatus.anchorY = 0;
        this.blackPlayerStatus.x = board.x + board.width + 5;
        this.blackPlayerStatus.y = this.blackPlayerLabel.y + this.blackPlayerLabel.height + 9;

        this.redPlayerStatus = cc.LabelTTF.create("未准备", "黑体", 15);
        this.redPlayerStatus.anchorX = 0;
        this.redPlayerStatus.anchorY = 1;
        this.redPlayerStatus.x = board.x + board.width + 5;
        this.redPlayerStatus.y = this.redPlayerLabel.y - this.redPlayerLabel.height - 5;
    },

    updatePlayerName: function (playerIndex, name) {
        if (playerIndex == 1) {
            this.blackPlayerLabel.setString("黑方: " + name);
        }
        else {
            this.redPlayerLabel.setString("红方: " + name);
        }
    },

    updatePlayerStatus: function (playerIndex, status) {
        var toUpdate;
        if (playerIndex == 1)
            toUpdate = this.blackPlayerStatus;
        else
            toUpdate = this.redPlayerStatus;

        toUpdate.setString(status);
        if (!toUpdate.parent)
            this.addChild(toUpdate);

    },

    addGetReadyBtn: function(){
        if(this.getReadyMenu && this.getReadyMenu.parent)
            return;

        var that = this;

        var getReadyBtn = cc.MenuItemFont.create("我准备好了", function (sender) {
            that.removeGetReadyBtn();

            var request = new Object();
            request["event"] = "getReady";
            request["roomId"] = this.parent.roomId;
            request["user"] = this.parent.whoAmI;

            WSController.sendMessage(JSON.stringify(request));
        }, this);
        getReadyBtn.fontSize = 25;
        getReadyBtn.fontName = "黑体";
        getReadyBtn.color = cc.color(255, 255, 255);


        this.getReadyMenu = new cc.Menu(getReadyBtn);
        this.getReadyMenu.anchorX = 0;
        this.getReadyMenu.x = cc.winSize.width - 85;
        this.getReadyMenu.y = cc.winSize.height / 2;
        this.addChild(this.getReadyMenu);
    },

    removeGetReadyBtn: function(){
        this.getReadyMenu.removeFromParent();
    }
});