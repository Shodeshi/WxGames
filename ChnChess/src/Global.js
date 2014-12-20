var ChessType = ChessType || {
    unknown: {"index":1, "sprite": res.unknown},
    bjiang: {"index":11, "sprite": res.bjiang, "owner": 0},
    bche: {"index":12, "sprite": res.bche, "owner": 0},
    bma: {"index":13, "sprite": res.bma, "owner": 0},
    bpao: {"index":14, "sprite": res.bpao, "owner": 0},
    bxiang: {"index":15, "sprite": res.bxiang, "owner": 0},
    bshi: {"index":16, "sprite": res.bshi, "owner": 0},
    bzu: {"index":17, "sprite": res.bzu, "owner": 0},
    rshuai: {"index":21, "sprite": res.rshuai, "owner": 1},
    rche: {"index":22, "sprite": res.rche, "owner": 1},
    rma: {"index":23, "sprite": res.rma, "owner": 1},
    rpao: {"index":24, "sprite": res.rpao, "owner": 1},
    rxiang: {"index":25, "sprite": res.rxiang, "owner": 1},
    rshi: {"index":26, "sprite": res.rshi, "owner": 1},
    rzu: {"index":27, "sprite": res.rzu, "owner": 1}
}
var WAITING = 0;
var STARTED = 1;

var Game = Game ||{
    status: WAITING,
    myTurn: -1,
    nextTurn: -1
}

var initArr = [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [1,2], [7,2], [0,3], [2,3], [4,3], [6,3], [8,3], [0,9], [1,9], [2,9], [3,9], [4,9], [5,9], [6,9], [7,9], [8,9], [1,7], [7,7], [0,6], [2,6], [4,6], [6,6], [8,6]];

var START_X = 32;
var START_Y = 18;
var DISTANCE = 32;