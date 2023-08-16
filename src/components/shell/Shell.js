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
exports.Shell = void 0;
var react_1 = __importStar(require("react"));
var Button_1 = require("../basic/Button");
var react_redux_1 = require("react-redux");
var serverAdress_1 = require("../../API/serverAdress");
var shell_1 = require("../../store/shell/shell");
var ShellSessionComponent_1 = require("./ShellSessionComponent");
var ConnectionList_1 = require("./ConnectionList");
var websocket;
var getWebsocket = function (dispatch) {
    if (websocket) {
        return websocket;
    }
    var socket = new WebSocket(serverAdress_1.sshProtocol + "://" + serverAdress_1.ip + ":" + serverAdress_1.port + "/sshShell/socket");
    socket.onopen = function () {
        console.log("connection is ssh is open");
    };
    socket.onmessage = function (_msg) {
        var _a;
        var smsg = JSON.parse(_msg.data);
        console.log(smsg);
        if (shell_1.isNextDirElementMap.get(smsg.id) ? (_a = shell_1.isNextDirElementMap.get(smsg.id)) === null || _a === void 0 ? void 0 : _a.msg : false) {
            dispatch((0, shell_1.setIsNextDirElement)({
                id: smsg.id,
                msg: false
            }));
            dispatch((0, shell_1.setDirElements)({
                id: smsg.id,
                msg: smsg.msg.split("\n")
            }));
        }
        else {
            dispatch((0, shell_1.updateOutput)(smsg));
        }
    };
    console.log("test");
    websocket = socket;
    return websocket;
};
function Shell() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var socket = getWebsocket(dispatch);
    var sessions = (0, react_redux_1.useSelector)(shell_1.selectShell.getSessions);
    return (react_1.default.createElement(_Shell, { socket: socket }));
}
exports.Shell = Shell;
function _Shell(props) {
    var sessions = (0, react_redux_1.useSelector)(shell_1.selectShell.getSessions);
    var _a = (0, react_1.useState)(0), selectedTab = _a[0], setSelectedTab = _a[1];
    var handleSelection = function (id) {
        console.log(id);
        setSelectedTab(id);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.ConnectionBar, { sshInfos: sessions.map(function (ele) { return ele.sshInfo; }), setSelectedIndex: selectedTab, handleOutput: function (index) { }, handleNewConnection: function () { return undefined; }, handleSelection: handleSelection }),
        selectedTab === sessions.length ? react_1.default.createElement(ConnectionList_1.ConnectionList, null) : react_1.default.createElement(ShellSessionComponent_1.ShellSessionComponent, { shellSession: sessions[selectedTab], socket: props.socket })));
}
