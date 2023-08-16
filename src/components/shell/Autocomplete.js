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
exports.Autocomplete = void 0;
var react_1 = __importStar(require("react"));
var Button_1 = require("../basic/Button");
function Autocomplete(props) {
    var _a, _b;
    var _c = (0, react_1.useState)(""), inputValue = _c[0], setInputValue = _c[1];
    var _d = (0, react_1.useState)(false), isHistoryListVisible = _d[0], setIsHistoryListVisible = _d[1];
    var _e = (0, react_1.useState)(false), isAutoListVisible = _e[0], setIsAutoListVisible = _e[1];
    var items = isAutoListVisible ? (_a = props.dirsEntry) !== null && _a !== void 0 ? _a : [] : (_b = props.histroy) !== null && _b !== void 0 ? _b : [];
    var _f = (0, react_1.useState)(items.length - 1), selectedIndex = _f[0], setSelectedIndex = _f[1];
    if (props.inputRef.current != undefined) {
        props.inputRef.current.value = inputValue;
    }
    console.log(props.inputRef);
    (0, react_1.useEffect)(function () {
        setSelectedIndex(items.length - 1);
    }, [props.histroy, props.dirsEntry]);
    (0, react_1.useEffect)(function () {
    }, [props.inputRef.current]);
    var handleKeyDown = function (event) {
        var _a, _b;
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex(function (prevIndex) { return Math.max(prevIndex - 1, -1); });
            if (!isAutoListVisible) {
                setIsHistoryListVisible(true);
            }
        }
        else if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex(function (prevIndex) { return Math.min(prevIndex + 1, items.length - 1); });
        }
        else if (event.key === "Enter" && selectedIndex !== -1) {
            if (isAutoListVisible) {
                var tmp = (_b = (_a = props.inputRef.current) === null || _a === void 0 ? void 0 : _a.value.split(" ")) !== null && _b !== void 0 ? _b : [];
                tmp.pop();
                var newInputVal = tmp.join(" ") + items[selectedIndex];
                console.log("newInputVal", newInputVal);
                setInputValue(newInputVal);
            }
            else {
                setInputValue(items[selectedIndex]);
            }
            setSelectedIndex(props.histroy != undefined ? props.histroy.length - 1 : 0);
            setIsHistoryListVisible(false);
            setIsAutoListVisible(false);
        }
        else if (event.key === "Escape") {
            setSelectedIndex(-1);
            setIsHistoryListVisible(false);
            setIsAutoListVisible(false);
            setSelectedIndex(props.histroy != undefined ? props.histroy.length - 1 : 0);
        }
        else if (event.key === "Tab") {
            setIsAutoListVisible(true);
        }
    };
    console.log(items);
    return (react_1.default.createElement("div", { className: "relative" },
        react_1.default.createElement(DropUpList, { items: items, onClick: setInputValue, selectedIndex: selectedIndex, isVisable: isHistoryListVisible || isAutoListVisible }),
        react_1.default.createElement(Button_1.TextField, { isLock: false, onKeyDown: function (ele) {
                if (!isHistoryListVisible) {
                    props.onKeyDown(ele);
                }
                handleKeyDown(ele);
            }, inputRef: props.inputRef })));
}
exports.Autocomplete = Autocomplete;
;
exports.default = Autocomplete;
function DropUpList(props) {
    var selectedIndex = props.selectedIndex;
    var items = props.items.slice(0, selectedIndex + 1);
    var ulRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(0), ulHeight = _a[0], setULHeight = _a[1];
    (0, react_1.useEffect)(function () {
        var _a;
        ulHeight = ((_a = ulRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0;
        setULHeight(ulHeight);
    }, [props.isVisable]);
    (0, react_1.useEffect)(function () {
        var _a;
        ulHeight = ((_a = ulRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0;
        setULHeight(ulHeight);
    }, [items]);
    return props.isVisable ? (react_1.default.createElement("div", { className: "absolute" },
        react_1.default.createElement("ul", { className: "absolute bg-white border opacity-90", style: { transform: "translateY(-".concat(ulHeight, "px)") }, ref: ulRef }, items.map(function (ele, index) { return (react_1.default.createElement("li", { key: index, className: "bottom-12 px-4 cursor-pointer ".concat(index === selectedIndex ? "bg-blue-200" : "") }, ele !== null && ele !== void 0 ? ele : "")); })))) : (react_1.default.createElement("div", null));
}
