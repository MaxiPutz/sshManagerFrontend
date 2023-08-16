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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellSessionComponent = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var shell_1 = require("../../store/shell/shell");
var Autocomplete_1 = require("./Autocomplete");
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
        console.log(e.key);
        if (e.key == "Enter") {
            shellOutput.push("".concat(pwd, ": ").concat((_b = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "", "\n"));
            var newShellSession = __assign(__assign({}, props.shellSession), { output: shellOutput });
            dispatch((0, shell_1.setSessionShellOutput)(newShellSession));
            props.socket.send("".concat(props.shellSession.UUID, ",").concat((_d = (_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : ""));
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            console.log(pwd);
            var fileName = inputRef.current != undefined ? inputRef.current.value.split(" ")[inputRef.current.value.split(" ").length - 1] : "";
            console.log("fileName", fileName);
            console.log(fileName[0] === "/", fileName[0]);
            dispatch((0, shell_1.setIsNextDirElement)({
                id: props.shellSession.UUID,
                msg: true
            }));
            if (fileName[0] === "/") {
                var _pwdArr = fileName.split("/");
                var _fileName = _pwdArr.pop();
                var _pwd = _pwdArr.join("/");
                var emitStr = "".concat(props.shellSession.UUID, ",find ").concat(_pwd, " -maxdepth 1 -name \"").concat(_fileName, "*\"");
                console.log(emitStr);
                props.socket.send(emitStr);
            }
            else {
                var emitStr = "".concat(props.shellSession.UUID, ",find ").concat(pwd, " -maxdepth 1 -name \"").concat(fileName, "*\"");
                console.log("jes /", emitStr);
                props.socket.send(emitStr);
            }
        }
        if (e.key == 'ArrowUp') {
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
                                react_1.default.createElement(Autocomplete_1.Autocomplete, { onKeyDown: onKeyDown, histroy: props.shellSession.shellHistory, dirsEntry: props.shellSession.dirElements, inputRef: inputRef, isLooked: false })))))))));
}
exports.ShellSessionComponent = ShellSessionComponent;
function replaceLast(str, subStr) {
    var tmp = str.split(subStr);
    if (tmp.length > 1) {
        tmp.pop(); // Remove the last element which is after the last occurrence of subStr
        return tmp.join(subStr);
    }
    return str; // Return original string if subStr not found
}
