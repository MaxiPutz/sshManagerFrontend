"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shell = void 0;
var react_1 = __importStar(require("react"));
var Button_1 = require("../basic/Button");
var react_redux_1 = require("react-redux");
var sshSlice_1 = require("../../store/sshSlice/sshSlice");
var serverAdress_1 = require("../../API/serverAdress");
var shell_1 = require("../../store/shell/shell");
var shell_2 = require("../../API/shell/shell");
function Shell() {
    var socket = new WebSocket(serverAdress_1.sshProtocol + "://" + serverAdress_1.ip + ":" + serverAdress_1.port + "/sshShell/socket");
    var dispatch = (0, react_redux_1.useDispatch)();
    var sessions = (0, react_redux_1.useSelector)(shell_1.selectShell.getSessions);
    socket.onopen = function () {
        console.log("connection is ssh is open");
    };
    socket.onmessage = function (_msg) {
        var smsg = JSON.parse(_msg.data);
        console.log(smsg);
        dispatch((0, shell_1.updateOutput)(smsg));
    };
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
        selectedTab === sessions.length ? react_1.default.createElement(ConnectionList, null) : react_1.default.createElement(ShellSessionComponent, { shellSession: sessions[selectedTab], socket: props.socket })));
}
function ShellSessionComponent(props) {
    var _a;
    var inputRef = (0, react_1.useRef)(null);
    var outputLength = props.shellSession.output.length;
    var lastOutput = props.shellSession.output[outputLength - 1];
    var pwd = (_a = lastOutput.split("\n")[lastOutput.split("\n").length - 2]) !== null && _a !== void 0 ? _a : lastOutput;
    var shellOutput = props.shellSession.output.map(function (ele, index) { return index !== outputLength - 1 ? ele : replaceLast(ele, pwd); });
    var dispatch = (0, react_redux_1.useDispatch)();
    var onKeyDown = function (e) {
        var _a, _b, _c, _d;
        if (e.key == "Enter") {
            shellOutput.push("".concat(pwd, ": ").concat((_b = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "", "\n"));
            var newShellSession = __assign(__assign({}, props.shellSession), { output: shellOutput });
            dispatch((0, shell_1.setSessionShellOutput)(newShellSession));
            props.socket.send("".concat(props.shellSession.UUID, ",").concat((_d = (_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : ""));
        }
    };
    (0, react_1.useEffect)(function () {
    }, [props.shellSession.output]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "fixed overflow-scroll h-5/6 flex flex-col-reverse m-5 w-full" },
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    react_1.default.createElement("pre", { className: " " }, shellOutput)),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("div", { className: "bg-white rounded-lg shadow m-11 dark:bg-gray-800 p-2" },
                        react_1.default.createElement("ul", { className: "flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0" },
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("pre", null,
                                    pwd,
                                    ":")),
                            react_1.default.createElement("li", { className: "w-3/5" },
                                react_1.default.createElement(Button_1.TextField, { isLock: false, onKeyDown: onKeyDown, inputRef: inputRef })))))))));
}
function ConnectionList() {
    var sshInfos = (0, react_redux_1.useSelector)(sshSlice_1.select.getSSH);
    var sessions = (0, react_redux_1.useSelector)(shell_1.selectShell.getSessions);
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleNewConnection = function (sshInfo) {
        var id = generateUUID();
        (0, shell_2.newConnection)(sshInfo, id);
        dispatch((0, shell_1.setShellSession)(__spreadArray(__spreadArray([], sessions, true), [{
                output: [""],
                sshInfo: sshInfo,
                UUID: id
            }], false)));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, sshInfos.map(function (ele, index) { return (react_1.default.createElement("div", { className: "" },
        react_1.default.createElement("div", { className: "grid grid-cols-2 gap-6", key: index },
            react_1.default.createElement("span", { className: "flex justify-end items-center" },
                " ", "".concat(ele.User, "@").concat(ele.IPAddress),
                " "),
            react_1.default.createElement("div", { className: "m-4" },
                react_1.default.createElement(Button_1.Button, { onClick: function () { return handleNewConnection(ele); }, isLock: false }, " Connect "))))); })));
}
function generateUUID() {
    var d = new Date().getTime(); //Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) { //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else { //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
function replaceLast(str, subStr) {
    var tmp = str.split(subStr);
    if (tmp.length > 1) {
        console.log(subStr);
        console.log(tmp);
        tmp.pop(); // Remove the last element which is after the last occurrence of subStr
        console.log(tmp);
        return tmp.join(subStr);
    }
    return str; // Return original string if subStr not found
}
