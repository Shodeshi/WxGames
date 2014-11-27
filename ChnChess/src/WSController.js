/**
 * Created by tyang on 2014/11/25.
 */
var WSController = WSController || {
    webSocket: null,
    HOST: "localhost",
    events: {},

    init: function (callback, params) {
        if (WSController.webSocket) {
            Logger.log('Already connected to WebSocket.');
        }
        else {
            WSController.webSocket = new WebSocket("ws://" + WSController.HOST + ":8080/GameServer-war/server");
            WSController.webSocket.onopen = function (event) {
                Logger.log('WebSocket connected.');
                if(callback)
                    callback(params);
            };
            WSController.webSocket.onerror = function () {
                Logger.error('WebSocket connect failed.');
            };
            WSController.webSocket.onmessage = function (event) {
                var message = JSON.parse(event.data);
                var eventName = message.event;
                if (WSController.events[eventName])
                    WSController.events[eventName]();
                else
                    Logger.error(eventName + ' event not exists!');

            }
        }
    },

    sendMessage: function (msg) {
        WSController.webSocket.send(msg);
    },

    registerEvent: function (eventName, callBackMethod) {
        if (callBackMethod) {
            WSController.events[eventName] = callBackMethod;
        }
    }
};