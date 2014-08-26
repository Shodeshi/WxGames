/**
 * Created by tyang on 8/22/2014.
 */
var GameLayer = cc.Layer.extend({
    xNum: null,
    yNum: null,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    itemArr: null,
    currentLevel: null,
    timerLabel: null,
    leftTime: null,
    levelLabel: null,
    levelArr: null,
    //当前图片数量N*N,=xNum=yNum
    currentItemCount: null,
    targetTag: null,
    leftHp: null,
    hpArr:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.levelArr = [1, 2, 5, 8, 13, 18];
        this.currentLevel = 1;
        this.currentItemCount = 1;
        this.leftHp = 3;
        this.hpArr = [];
        for(var i=0;i<this.leftHp;i++){
            var hpSprite = cc.Sprite.create(res.hp);
            hpSprite.x = cc.winSize.width - (hpSprite.width+5)*(i+0.5);
            hpSprite.y = cc.winSize.height - 30;
            hpSprite.anchorX = 0.5;
            hpSprite.anchorY = 0.5;
            this.hpArr[i] = hpSprite;
            this.addChild(hpSprite);
        }


        this.levelLabel = cc.LabelTTF.create("第" + this.currentLevel + "关", "黑体", 25);
        this.levelLabel.x = 40;
        this.levelLabel.y = cc.winSize.height - 40;
        this.addChild(this.levelLabel);

        this.startCurrentLevel();

        this.leftTime = 15;
        this.timerLabel = cc.LabelTTF.create(this.leftTime, "黑体", 40);
        this.timerLabel.x = cc.winSize.width / 2;
        this.timerLabel.y = 40;
        this.timerLabel.color = cc.color(255, 0, 0);
        this.addChild(this.timerLabel);

        var fade = cc.fadeOut(0.5);
        var fade_in = fade.reverse();
        var delay = cc.delayTime(0);
        var seq = cc.sequence(fade, delay, fade_in, delay.clone());
        var repeat = seq.repeatForever();
        this.timerLabel.runAction(repeat);

        this.schedule(this.step, 1);
        if(cc.director.isPaused())
            cc.director.resume();
    },
    startCurrentLevel: function () {
        if (this.currentLevel == this.levelArr[this.currentItemCount]) {
            this.currentItemCount++;
        }
        this.xNum = this.currentItemCount + 1;//(this.currentLevel > maxNum ? maxNum : this.currentLevel) + 1;
        this.yNum = this.currentItemCount + 1;//(this.currentLevel > maxNum ? maxNum : this.currentLevel) + 1;
        this.startX = cc.winSize.width / 2 - (this.xNum * itemWidth) / 2;
        this.startY = cc.winSize.height / 2 - (this.yNum * itemHeight) / 2;
        this.endX = this.startX + this.xNum * itemWidth;
        this.endY = this.startY + this.yNum * itemHeight;
        this.itemArr = new Array();

        var totalNum = this.xNum * this.yNum;
        var targetIndex = Math.floor(Math.random() * totalNum);
//        var targetX = Math.floor(targetIndex / this.xNum);
//        var targetY = targetIndex % this.xNum;
//        cc.log("target is: " + targetX + ", " + targetY);


        var trueItemCount = 0;
        var falseItemCount = 0;
        this.targetTag = Math.random() > 0.5 ? SpriteTag.itemTagA : SpriteTag.itemTagB;
        var otherTag = (this.targetTag == SpriteTag.itemTagA ? SpriteTag.itemTagB : SpriteTag.itemTagA)
        for (var i = 0; i < this.xNum; i++) {
            for (var j = 0; j < this.yNum; j++) {
                var tag = null;
                if ((falseItemCount == (this.xNum * this.yNum - this.currentLevel)) || (Math.random() > 0.5 && trueItemCount < this.currentLevel)) {
                    tag = this.targetTag;
                    trueItemCount++;
                }
                else {
                    tag = otherTag;
                    falseItemCount++
                }

                var item = new Item(this, tag, (i + 0.5) * itemWidth + this.startX, (j + 0.5) * itemHeight + this.startY);
                if (this.itemArr[i] == null) {
                    var rowArr = new Array();
                    this.itemArr[i] = rowArr;
                }
                this.itemArr[i][j] = item;
            }
        }

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchEnded: this.onTouchEnded
        }, this)
    },
    step: function (dt) {
        this.leftTime--;
        this.timerLabel.setString(this.leftTime);
        if (this.leftTime <= 0) {
            cc.director.pause();
            this.unschedule(this.step);
            this.timerLabel.removeFromParent();
            this.timerLabel = null;
            cc.log("gg!");

            cc.eventManager.removeAllListeners();
            this.addGameOverLayer("GG!重新开始")
        }
    },
    addGameOverLayer: function (str) {
        var gameOverLayer = cc.LayerColor.create(cc.color(0, 0, 0, 140), cc.winSize.width, cc.winSize.height);
        var restartItem = cc.MenuItemFont.create(str, function (sender) {
            cc.director.runScene(new GameScene());
        }, this);
        restartItem.fontSize = 20;
        restartItem.fontName = "黑体";
        restartItem.color = cc.color(255, 255, 255);

        var menu = cc.Menu.create(restartItem);
        menu.x = cc.winSize.width / 2;
        menu.y = cc.winSize.height / 2;
        gameOverLayer.addChild(menu);
        this.addChild(gameOverLayer);
    },
    onTouchBegan: function (touch, event) {

        var target = event.getCurrentTarget();
        var touchX = touch.getLocation().x;
        var touchY = touch.getLocation().y;
        if (touchX >= target.startX && touchX <= target.endX && touchY >= target.startY && touchY <= target.endY) {
            var positionX = Math.floor((touchX - target.startX) / itemWidth);
            var positionY = Math.floor((touchY - target.startY) / itemHeight);

            if (target.targetTag == target.itemArr[positionX][positionY].spriteTag)
                target.findTheOne();
            else {
                target.leftHp--;
                target.hpArr[target.leftHp].removeFromParent();
                target.hpArr[target.leftHp] = null;
                if (target.leftHp == 0) {
                    cc.director.pause();
                    cc.eventManager.removeAllListeners();
                    target.unschedule(target.step);
                    target.addGameOverLayer("GG!重新开始");
                }
            }
        }

        return true;
    },
    onTouchEnded: function (touch, event) {
    },
    findTheOne: function () {
        cc.eventManager.removeAllListeners();
        if (this.currentLevel == this.levelArr[this.levelArr.length - 1] - 1) {
            this.unschedule(this.step);
            cc.director.pause();
            this.addGameOverLayer("你赢了！重新开始");
        }
        else {
            for (var i = 0; i < this.xNum; i++) {
                for (var j = 0; j < this.yNum; j++) {
                    this.itemArr[i][j].removeFromParent();
                }
            }
            this.itemArr = null;
            this.currentLevel++;
            this.levelLabel.setString("第" + this.currentLevel + "关");

            this.startCurrentLevel();
        }
    }
});