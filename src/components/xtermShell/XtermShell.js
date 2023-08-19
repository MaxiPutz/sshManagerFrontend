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
exports.XtermShell = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var xterm_1 = require("xterm");
var XtermContainer_1 = require("./XtermContainer");
var xtermShell_1 = require("../../store/shell/xtermShell");
require("xterm/css/xterm.css");
function XtermShell(props) {
    var terminalRef = (0, react_1.useRef)(null);
    var socket = (0, XtermContainer_1.getSocket)();
    var term = new xterm_1.Terminal();
    var _a = (0, react_1.useState)(0), val = _a[0], setVal = _a[1];
    var closeCount = 0;
    var openCount = 0;
    var isOpen = false;
    var select = (0, react_redux_1.useSelector)(xtermShell_1.selectXtermShell.getSessions);
    var output = "";
    term.onData(function (data) {
        var sendData = JSON.stringify({
            id: props.uuid,
            msg: data
        });
        console.log("xterm", sendData);
        socket.send(sendData);
    });
    (0, react_1.useEffect)(function () {
        output = select.find(function (ele) { return ele.UUID === props.uuid; }).output;
        term.write(output);
    }, [select, props.uuid]);
    (0, react_1.useEffect)(function () {
        console.log("term ref", terminalRef.current);
        console.log("isopen", isOpen);
        console.log("count open", openCount);
        console.log("close count", closeCount);
        if (openCount === 1 && output.length > 3) {
            var sendData = JSON.stringify({
                id: props.uuid,
                msg: "\u001b[A"
            });
            console.log("xterm", sendData);
            socket.send(sendData);
        }
        if (terminalRef.current != undefined && !isOpen) {
            console.log("try to open term");
            openCount++;
            term.open(terminalRef.current);
            term.focus();
            console.log("term", term);
            console.log("term", term.element);
            term.resize(70, 60);
            var handleResize = function () {
                var cols = term.cols, rows = term.rows;
                // socket.send(JSON.stringify({ 'resize': { cols, rows } }))
                console.log("size", cols, rows);
            };
            term.onResize(handleResize);
            isOpen = true;
            return function () {
                term.dispose();
                closeCount++;
            };
        }
    }, [props.uuid, select, output]); // [select]
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "h-96 w-full", ref: terminalRef }),
        ";");
}
exports.XtermShell = XtermShell;
;
