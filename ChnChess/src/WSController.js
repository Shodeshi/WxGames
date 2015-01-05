/**
 * Created by tyang on 2014/11/25.
 */
var WSController = WSController || {
    webSocket: null,
    HOST: "123.57.10.169",
    //My host: 123.57.10.169
    events: {},

    init: function (callback) {
        if (WSController.webSocket) {
            Logger.log('Already connected to WebSocket.');
        }
        else {
            WSController.webSocket = new WebSocket("ws://" + WSController.HOST + ":8080/GameServer-war/server");
            WSController.webSocket.onopen = function (event) {
                Logger.log('WebSocket connected.');
                if (callback)
                    callback["func"].apply(callback["obj"]);
            };
            WSController.webSocket.onerror = function () {
                Logger.error('WebSocket connect failed.');
            };
            WSController.webSocket.onmessage = function (event) {
                var response = JSON.parse(event.data);
                Logger.log("Server response: " + event.data);

                var eventName = response.event;
                var callbackObj = WSController.events[eventName];
                if (callbackObj)
                    callbackObj["func"].apply(callbackObj["obj"], [response]);
                else
                    Logger.error(eventName + ' event not exists!');

            }
        }
    },

    sendMessage: function (msg) {
        WSController.webSocket.send(msg);
    },

    registerEvent: function (eventName, callBackObj) {
        if (callBackObj) {
            WSController.events[eventName] = callBackObj;
        }
    },

    removeEvent: function (eventName) {
        WSController.events[eventName] = undefined;
    }
};