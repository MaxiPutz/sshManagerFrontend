"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XtermConnectionList = void 0;
var react_redux_1 = require("react-redux");
var shell_1 = require("../../API/shell/shell");
var sshSlice_1 = require("../../store/sshSlice/sshSlice");
var xtermShell_1 = require("../../store/shell/xtermShell");
var react_1 = __importDefault(require("react"));
var Button_1 = require("../basic/Button");
function XtermConnectionList() {
    var sshInfos = (0, react_redux_1.useSelector)(sshSlice_1.select.getSSH);
    var sessions = (0, react_redux_1.useSelector)(xtermShell_1.selectXtermShell.getSessions);
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleNewConnection = function (sshInfo) {
        var id = generateUUID();
        (0, shell_1.newConnection)(sshInfo, id);
        dispatch((0, xtermShell_1.setXtermShellSession)(__spreadArray(__spreadArray([], sessions, true), [{
                shellHistory: undefined,
                output: "",
                sshInfo: sshInfo,
                UUID: id,
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
exports.XtermConnectionList = XtermConnectionList;
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
