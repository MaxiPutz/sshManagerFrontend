"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newConnection = void 0;
var serverAdress_1 = require("../serverAdress");
var newConnection = function (sshInfo, uuid) {
    var url = serverAdress_1.getUrl + "/sshShell/newConnection";
    fetch(url, { method: "POST", body: JSON.stringify({
            UUID: uuid,
            IPAddress: sshInfo.IPAddress,
            User: sshInfo.User,
            Password: sshInfo.Password,
            Key: sshInfo.Key
        }) }).then(function (ele) { return ele.json(); }).then(function (ele) { return console.log(ele); });
};
exports.newConnection = newConnection;
