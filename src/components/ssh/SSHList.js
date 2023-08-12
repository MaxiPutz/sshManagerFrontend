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
exports.ListSSH = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var sshSlice_1 = require("../../store/sshSlice/sshSlice");
function ListSSH() {
    var sshs = (0, react_redux_1.useSelector)(sshSlice_1.select.getSSH);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "text-3xl font-bold" },
            react_1.default.createElement("h1", null, "SSH List")),
        react_1.default.createElement("div", null,
            react_1.default.createElement(SSHTable, { elements: sshs }))));
}
exports.ListSSH = ListSSH;
var SSHTable = function (props) {
    var elements = props.elements;
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_1.useState)(new Array(elements.length).fill(false)), selectedSSHinfo = _a[0], setSelected = _a[1]; // why i can not use new Array(elements.length).fill(false)
    var _b = (0, react_1.useState)(false), selectAll = _b[0], setSelectAll = _b[1];
    (0, react_1.useEffect)(function () {
        var tmp = elements.reduce(function (prev, curr, index) { return selectedSSHinfo[index] != undefined ? __spreadArray(__spreadArray([], prev, true), [selectedSSHinfo[index]], false) : __spreadArray(__spreadArray([], prev, true), [false], false); }, []);
        setSelected(tmp);
        console.log("tmp", tmp);
    }, [props.elements]);
    var selectHandler = function (e, index) {
        console.log(selectedSSHinfo);
        var newVal = __spreadArray([], selectedSSHinfo, true);
        console.log(newVal);
        newVal[index] = e.target.checked;
        setSelected(newVal);
        var sshs = newVal.reduce(function (prev, cur, index) { return cur ? __spreadArray(__spreadArray([], prev, true), [__assign(__assign({}, elements[index]), { index: index })], false) : __spreadArray([], prev, true); }, []);
        dispatch((0, sshSlice_1.setSelectedSSH)(sshs));
        setSelectAll(false);
    };
    var selectAllHandler = function (e) {
        if (e.target.checked) {
            setSelectAll(true);
            (0, sshSlice_1.setSelectedSSH)(new Array(elements.length).fill(true));
            var tmp = elements.map(function (e, i) { return (__assign(__assign({}, e), { index: i })); });
            dispatch((0, sshSlice_1.setSelectedSSH)(tmp));
        }
        else {
            setSelectAll(false);
            var newVal = __spreadArray([], selectedSSHinfo, true);
            var sshs = newVal.reduce(function (prev, cur, index) { return __spreadArray(__spreadArray([], prev, true), [__assign({}, elements[index])], false); }, []);
            dispatch((0, sshSlice_1.setSelectedSSH)(sshs));
            setSelectAll(false);
        }
    };
    console.log(selectedSSHinfo);
    return (react_1.default.createElement("div", { className: "border border-black" },
        react_1.default.createElement("div", { className: "grid grid-cols-6" },
            react_1.default.createElement("td", { className: "border-b-2 border-black flex justify-center" },
                react_1.default.createElement("input", { type: "checkbox", name: "", id: "", checked: selectAll, onChange: selectAllHandler }),
                " Select SSH "),
            react_1.default.createElement("th", { className: "border-b-2 border-black" }, "rowNumber"),
            react_1.default.createElement("th", { className: "border-b-2 border-black" }, "IP Address"),
            react_1.default.createElement("th", { className: "border-b-2 border-black" }, "User"),
            react_1.default.createElement("th", { className: "border-b-2 border-black" }, "Password"),
            react_1.default.createElement("th", { className: "border-b-2 border-black" }, "Key")),
        elements.map(function (ele, i) {
            return (react_1.default.createElement("div", { key: i },
                react_1.default.createElement("div", { className: "grid grid-cols-6" },
                    react_1.default.createElement("td", { className: "justify-self-center" },
                        " ",
                        react_1.default.createElement("input", { type: "checkbox", name: "", id: "", checked: selectedSSHinfo[i], onChange: function (e) { return selectHandler(e, i); } }),
                        " "),
                    react_1.default.createElement("td", { className: "justify-self-center" }, i),
                    react_1.default.createElement("td", { className: "justify-self-center" }, ele.IPAddress),
                    react_1.default.createElement("td", { className: "justify-self-center" }, ele.User),
                    react_1.default.createElement("td", { className: "justify-self-center" }, "*********"),
                    react_1.default.createElement("td", { className: "justify-self-center" }, "*********" || ''),
                    react_1.default.createElement("td", { className: "justify-self-center" }))));
        })));
};
