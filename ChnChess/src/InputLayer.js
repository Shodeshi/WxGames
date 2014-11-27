/**
 * Created by Shodeshi on 2014/11/27.
 */
var InputLayer = cc.Layer.extend({
    textField: null,
    defaultStr: null,
    textFieldAction: null,
    action: false,
    enableBtn: null,

    ctor: function (str) {
        this._super();
        this.init();
        this.defaultStr = str;

        if ('touches' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded: this.onTouchesEnded
            }, this);
        } else if ('mouse' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: this.onMouseUp
            }, this);
    },

    onTouchesEnded: function (touches, event) {
        var target = event.getCurrentTarget();
        if (!target.textField)
            return;

        // grab first touch
        if (touches.length == 0)
            return;

        var touch = touches[0];
        var point = touch.getLocation();
        var rect = textInputGetRect(this.textField);

        target.onClickTrackNode(cc.rectContainsPoint(rect, point));
    },

    onMouseUp: function (event) {
        var target = event.getCurrentTarget();
        if (!target.textField)
            return;

        var point = event.getLocation();
        var rect = textInputGetRect(target.textField);

        target.onClickTrackNode(cc.rectContainsPoint(rect, point));
    },

    onClickTrackNode: function (clicked) {
        var textField = this.textField;
        if (clicked) {
            textField.attachWithIME();
        } else {
            textField.detachWithIME();
        }
    },

    getStr: function () {
        return this.textField.getString();
    },


    //CCTextFieldDelegate
    onTextFieldAttachWithIME: function (sender) {
        if (!this.action) {
            this.textField.runAction(this.textFieldAction);
            this.action = true;
        }
        return false;
    },
    onTextFieldDetachWithIME: function (sender) {
        if (this.action) {
            this.textField.stopAction(this.textFieldAction);
            this.textField.opacity = 255;
            this.action = false;
        }
        return false;
    },
    onTextFieldInsertText: function (sender, text, len) {
        if (this.enableBtn && sender.getCharCount() >= 0)
            this.enableBtn.enabled = true;
    },

    onTextFieldDeleteBackward: function (sender, delText, len) {
        if (this.enableBtn && sender.getCharCount() <= 1)
            this.enableBtn.enabled = false;
    },

    onEnter: function () {
        this._super();

        this.textFieldAction = cc.sequence(
            cc.fadeOut(0.25),
            cc.fadeIn(0.25)
        ).repeatForever();

        // add CCTextFieldTTF
        var winSize = cc.director.getWinSize();

        this.textField = new cc.TextFieldTTF(this.defaultStr, "黑体", 30);
        this.addChild(this.textField);
        this.textField.x = winSize.width / 2;
        this.textField.y = winSize.height / 2 + 100;
        this.textField.setDelegate(this);

    },
    onDraw: function (sender) {
        return false;
    },

    setEnableBtn: function (btn) {
        this.enableBtn = btn;
    }
});

var textInputGetRect = function (node) {
    var rc = cc.rect(node.x, node.y, node.width, node.height);
    rc.x -= rc.width / 2;
    rc.y -= rc.height / 2;
    return rc;
};