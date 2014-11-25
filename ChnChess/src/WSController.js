/**
 * Created by tyang on 2014/11/25.
 */
var WSController = WSController || {
    webSocket: null,
    HOST: "localhost",
    events: {},

    init: function () {
        if (this.webSocket) {
            console.log('Already connected to WebSocket.');
        }
        else {
            this.webSocket = new WebSocket("ws://" + this.HOST + ":8080/GameServer-war/server");
            this.webSocket.onopen = function (event) {
                console.log('WebSocket connected.');
            };
            this.webSocket.onerror = function () {
                console.error('WebSocket connect failed.');
            };
            this.webSocket.onmessage = function (event) {
                var message = JSON.parse(event.data);
                var eventName = message.event;
                if (WSController.events[eventName])
                    WSController.events[eventName]();
                else
                    console.error(eventName + ' event not exists!');

            }
        }
    },

    sendMessage: function (msg) {
        this.webSocket.send(msg);
    },

    registerEvent: function (eventName, callBackMethod) {
        if (callBackMethod) {
            this.events[eventName] = callBackMethod;
        }
    }
};