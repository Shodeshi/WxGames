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
    selectedSprite: null,
    previousChess: null,
    previousPosition: null,
    isMoving: 0,

    ctor: function (roomId) {
        this._super();
        this.init(roomId);
    },
    init: function (roomId) {

        // 添加棋盘
        var board = cc.Sprite.create(res.chessBoard);
        board.anchorX = 0;
        board.anchorY = 0;
        this.addChild(board);

        // 初始化棋盘数组
        this.boardArr = new Array();
        for (var i = 0; i < 9; i++) {
            this.boardArr[i] = new Array();
            for (var j = 0; j < 10; j++) {
                this.boardArr[i][j] = 0;
            }
        }

        for (var i = 0; i < initArr.length; i++) {

            var indexX = initArr[i][0];
            var indexY = initArr[i][1];

            var chess = new Chess(indexX, indexY, ChessType.unknown);
            this.boardArr[indexX][indexY] = chess;
            this.addChild(chess.sprite);
        }

        var roomIdLabel = cc.LabelTTF.create("房间号：" + roomId, "黑体", 15);
        roomIdLabel.anchorX = 0;
        roomIdLabel.anchorY = 0;
        roomIdLabel.x = board.x + board.width + 5;
        roomIdLabel.y = cc.winSize.height - roomIdLabel.height - 5;
        this.addChild(roomIdLabel);

        var menuItem = cc.MenuItemFont.create("退出房间", function(){
            cc.director.runScene(new RoomScene());

            var request = new Object();
            request["event"] = "exitRoom";
            request["user"] = Game.myUserObj;
            WSController.sendMessage(JSON.stringify(request));
        }, this);
        menuItem.fontSize = 15;
        menuItem.fontName = "黑体";
        menuItem.color = cc.color(255, 255, 255);

        var menu = new cc.Menu(menuItem);
        menu.anchorX = 1;
        menu.anchorY = 1;
        menu.x = cc.winSize.width - 35;
        menu.y = cc.winSize.height - 13;
        this.addChild(menu);

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
        this.redPlayerLabel.y = cc.winSize.height - this.redPlayerLabel.height - 25;
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

        this.selectedSprite = cc.Sprite.create(res.selected);
        this.selectedSprite.setVisible(false);
        this.selectedSprite.setScaleX(0.5);
        this.selectedSprite.setScaleY(0.5);
        this.addChild(this.selectedSprite);

        var selfPointer = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if (Game.status != STARTED || Game.myTurn != Game.nextTurn)
                    return false;

                var location = touch.getLocation();
                var indexX = Math.round((location.x - START_X) / DISTANCE);
                var indexY = Math.round((location.y - START_Y) / DISTANCE);

                // Out of bound
                if(indexX > 8 || indexY > 9)
                    return false;

                cc.log("Touching :" + indexX + ", " + indexY);
                selfPointer.touchChess(indexX < 0 ? 0 : indexX, indexY < 0 ? 0 : indexY);

                var chess = selfPointer.boardArr[indexX][indexY];
                // You can only move the chess when you are selecting yourselves
                if (chess && chess.chessType != ChessType.unknown && Game.myTurn == chess.chessType["owner"])
                    return true;

                return false;
            },
            onTouchMoved: function (touch, event) {
                var chess = selfPointer.previousChess;
                var location = touch.getLocation();
                var indexX = Math.round((location.x - START_X) / DISTANCE);
                var indexY = Math.round((location.y - START_Y) / DISTANCE);

                chess.moveTo(location.x, location.y);
                selfPointer.setSelected(indexX, indexY);
            },
            onTouchEnded: function (touch, event) {
                var chess = selfPointer.previousChess;
                var location = touch.getLocation();
                var indexX = Math.round((location.x - START_X) / DISTANCE);
                var indexY = Math.round((location.y - START_Y) / DISTANCE);

                // When the end position already has one chess
                var endChess = selfPointer.boardArr[indexX][indexY]
                if (endChess) {
                    if (endChess.chessType["owner"] == chess.chessType["owner"] || endChess.chessType == ChessType.unknown) {
                        // We encountered our chess or unknown chess, move the chess back
                        chess.moveToIndex(chess.indexX, chess.indexY);

                        // Don't need send any request, just return
                        return;
                    }
                    else {
                        // Eat it!
                        endChess.destroy();
                    }
                }

                chess.moveToIndex(indexX, indexY);
                selfPointer.selectedSprite.setVisible(false);

                // Build move request object
                var request = new Object();
                request["event"] = "moveChess";
                request["roomId"] = selfPointer.parent.roomId;
                request["user"] = Game.myUserObj;
                request["from"] = [chess.indexX, chess.indexY];
                request["to"] = [indexX, indexY];

                // Update the board array and chess index
                selfPointer.boardArr[chess.indexX][chess.indexY] = 0;
                chess.indexX = indexX;
                chess.indexY = indexY;
                selfPointer.boardArr[indexX][indexY] = chess;

                // Set next turn
                Game.nextTurn = Game.myTurn == 0 ? 1 : 0;

                // Send move request
                WSController.sendMessage(JSON.stringify(request));
            }
        });

        cc.eventManager.addListener(listener, this);
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

    addGetReadyBtn: function () {
        if (this.getReadyMenu && this.getReadyMenu.parent)
            return;

        var that = this;

        var getReadyBtn = cc.MenuItemFont.create("我准备好了", function (sender) {
            that.removeGetReadyBtn();

            var request = new Object();
            request["event"] = "getReady";
            request["roomId"] = this.parent.roomId;
            request["user"] = Game.myUserObj;

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

    removeGetReadyBtn: function () {
        this.getReadyMenu.removeFromParent();
    },

    touchChess: function (indexX, indexY) {
        var chess = this.boardArr[indexX][indexY];
        if (chess && chess.isSelected) {
            // Send show chess request
            var request = new Object();
            request["event"] = "showChess";
            request["roomId"] = this.parent.roomId;
            request["user"] = Game.myUserObj;
            request["position"] = {
                "indexX": indexX,
                "indexY": indexY
            };

            WSController.sendMessage(JSON.stringify(request));
        }
        else {
            // Set previous selected chess to unselected
            if (this.previousChess)
                this.previousChess.isSelected = false;

            // Save current touching chess as previous selected chess
            this.previousChess = chess;
            // Select touching chess
            this.setSelected(indexX, indexY);
            chess.isSelected = true;
        }
    },

    setSelected: function (indexX, indexY) {
        this.selectedSprite.x = 32 + indexX * 32;
        this.selectedSprite.y = 18 + indexY * 32;
        this.selectedSprite.setVisible(true);
    },

    updateBoard: function (response) {
        if ("showChess" == response["subEvent"]) {
            Game.nextTurn = response["nextTurn"];
            var showChess = response["chess"];
            this.selectedSprite.setVisible(false);

            var indexX = showChess["indexX"];
            var indexY = showChess["indexY"];
            this.boardArr[indexX][indexY].showChess(showChess["chessType"]);
//            cc.log("Show chess: " + showChess["indexX"] + ", " + showChess["indexY"] + " --- " + showChess["chessType"]);
        }

        if ("moveChess" == response["subEvent"]) {

            // If the move response came from the other player
            if (response["nextTurn"] == Game.myTurn) {
                var fromX = response["from"][0];
                var fromY = response["from"][1];
                var toX = response["to"][0];
                var toY = response["to"][1];

                // Retrieve from chess
                var fromChess = this.boardArr[fromX][fromY];
                this.boardArr[fromX][fromY] = 0;

                // If the end position has chess, remove it
                if (this.boardArr[toX][toY])
                    this.boardArr[toX][toY].destroy();

                // Save the from chess
                fromChess.indexX = toX;
                fromChess.indexY = toY;
                this.boardArr[toX][toY] = fromChess;


                // Run the moving animation
                this.isMoving = 1;
                var that = this;
                var action = cc.moveTo(0.5, cc.p(START_X + toX * DISTANCE, START_Y + toY * DISTANCE));
                var callback = cc.callFunc(function(){
                    that.isMoving = 0;
                }, this);
                var sequence = cc.sequence(action, callback);
                fromChess.sprite.runAction(sequence);
            }

            // Set next turn
            Game.nextTurn = response["nextTurn"];
        }
    },

    reset: function(){
        // Clean all the chess
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 10; j++) {
                if(this.boardArr[i][j] != 0)
                    this.boardArr[i][j].destroy();
                this.boardArr[i][j] = 0;
            }
        }

        // Init the board with unknown chess
        for (var i = 0; i < initArr.length; i++) {

            var indexX = initArr[i][0];
            var indexY = initArr[i][1];

            var chess = new Chess(indexX, indexY, ChessType.unknown);
            this.boardArr[indexX][indexY] = chess;
            this.addChild(chess.sprite);
        }
    }

});