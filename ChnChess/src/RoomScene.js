/**
 * Created by tyang on 2014/12/29.
 */
var RoomScene = cc.Scene.extend({
    roomArr: null,
    roomInfoArr: null,

    ctor: function (roomInfo) {
        this.roomInfoArr = roomInfo;
        this._super();
    },

    onEnter: function () {
        this._super();
        this.addChild(new BackGroundLayer());

        this.roomArr = new Array();
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 5; j++) {
                var roomId = (5 - j - 1) * 2 + 1 + i;
                var room = new RoomLayer(roomId);
                room.x = 5 + i * (10 + room.width);
                room.y = 5 + j * (10 + room.height);
                this.addChild(room);

                this.roomArr[roomId] = room;
            }
        }

        if(this.roomInfoArr != null){
            for (var i = 0; i < this.roomInfoArr.length; i++) {
                var room = this.roomInfoArr[i];
                this.roomArr[room["roomId"]].updateRoomInfo(room["playerCount"]);
            }
        }

        // Register the event for updating room information
        var updateRoomInfoCallBack = new Object();
        var that = this;
        updateRoomInfoCallBack["func"] = function(response){
            var roomInfoArr = response["rooms"];
            for (var i = 0; i < roomInfoArr.length; i++) {
                var room = roomInfoArr[i];
                that.roomArr[room["roomId"]].updateRoomInfo(room["playerCount"]);
            }
        }
        WSController.registerEvent("updateRoomInfo", updateRoomInfoCallBack);

    }
});