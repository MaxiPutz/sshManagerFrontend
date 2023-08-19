"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XtermContainer = exports.getSocket = void 0;
var react_1 = __importStar(require("react"));
var XtermConnectionList_1 = require("./XtermConnectionList");
var Button_1 = require("../basic/Button");
var react_redux_1 = require("react-redux");
var xtermShell_1 = require("../../store/shell/xtermShell");
var serverAdress_1 = require("../../API/serverAdress");
var xtermShell_2 = require("../../store/shell/xtermShell");
var XtermShell_1 = require("./XtermShell");
var websocket;
var _getSocket = function (dispatch) {
    if (websocket) {
        return websocket;
    }
    var socket = new WebSocket(serverAdress_1.sshProtocol + "://" + serverAdress_1.ip + ":" + serverAdress_1.port + "/sshShell/socket");
    socket.onopen = function () {
        console.log("connection is ssh is open");
    };
    socket.onmessage = function (_msg) {
        var smsg = JSON.parse(_msg.data);
        console.log(smsg);
        dispatch((0, xtermShell_2.updateOutput)(smsg));
    };
    console.log("test");
    websocket = socket;
    return websocket;
};
var getSocket = function () {
    return websocket;
};
exports.getSocket = getSocket;
function XtermContainer() {
    var sessions = (0, react_redux_1.useSelector)(xtermShell_1.selectXtermShell.getSessions);
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_1.useState)(0), selectedTab = _a[0], setSelectedTab = _a[1];
    _getSocket(dispatch);
    var handleSelection = function (id) {
        console.log(id);
        setSelectedTab(id);
    };
    console.log("dere oida");
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.ConnectionBar, { sshInfos: sessions.map(function (ele) { return ele.sshInfo; }), setSelectedIndex: selectedTab, handleOutput: function (index) { }, handleNewConnection: function () { return undefined; }, handleSelection: handleSelection }),
        selectedTab === sessions.length ? react_1.default.createElement(XtermConnectionList_1.XtermConnectionList, null) : react_1.default.createElement(XtermShell_1.XtermShell, { uuid: sessions[selectedTab].UUID })));
}
exports.XtermContainer = XtermContainer;
