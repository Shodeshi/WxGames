/**
 * Created by tyang on 2014/12/29.
 */
var RoomScene = cc.Scene.extend({
    ctor: function (userName) {
        this._super();

    },

    onEnter: function () {
        this._super();
        this.addChild(new BackGroundLayer());

        for(var i = 0; i<2;i++){
            for(var j =0;j<5;j++){
                var roomId = (5 - j - 1) * 2 + 1 + i;
                var room = new RoomLayer(roomId);
                room.x =  5 + i * (10 + room.width);
                room.y =  5 + j * (10 + room.height);
                this.addChild(room);
            }
        }

    }
});