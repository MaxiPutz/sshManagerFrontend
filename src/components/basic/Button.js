"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionBar = exports.Label = exports.Select = exports.TextField = exports.Button = void 0;
var react_1 = __importDefault(require("react"));
function Button(props) {
    var _a;
    var classNameString = (!props.isLock) ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" : 'bg-gray-400 cursor-not-allowed';
    classNameString = "".concat((_a = props.className) !== null && _a !== void 0 ? _a : "", " ").concat(classNameString);
    console.log(classNameString);
    return react_1.default.createElement("button", { className: classNameString, disabled: props.isLock, onClick: props.onClick }, props.children);
}
exports.Button = Button;
function TextField(props) {
    var _a;
    return react_1.default.createElement("input", { type: "text", disabled: props.isLock, className: (_a = props.className) !== null && _a !== void 0 ? _a : "" + " " + "mt-2 block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", value: props.value, onChange: (props.onChange), ref: props.inputRef, onKeyDown: props.onKeyDown });
}
exports.TextField = TextField;
function Select(props) {
    return react_1.default.createElement("select", { disabled: props.isLook, onChange: props.onChange, className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" }, props.children);
}
exports.Select = Select;
function Label(props) {
    return (react_1.default.createElement("label", { className: "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4" },
        " ",
        props.children,
        " "));
}
exports.Label = Label;
function ConnectionBar(props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("ul", { className: "bg-gray-50 w-full overflow-hidden" },
            props.sshInfos.map(function (sshInfo, i) { return (react_1.default.createElement("li", { key: "SSHAction" + i, className: "float-left mt-3 pt-3 pl-3 pr-3 " + ((props.setSelectedIndex === i) ? "bg-white border-t-2" : "") },
                react_1.default.createElement("button", { onClick: function () {
                        props.handleSelection(i);
                        props.handleOutput(i);
                    } },
                    " ",
                    sshInfo.User,
                    "@",
                    sshInfo.IPAddress))); }),
            react_1.default.createElement("li", { className: "float-left mt-3 pt-3 pl-3 pr-3 " + ((props.setSelectedIndex === props.sshInfos.length) ? "bg-white border-t-2" : "") },
                react_1.default.createElement("button", { onClick: function () {
                        props.handleSelection(props.sshInfos.length);
                        props.handleNewConnection();
                    } }, " add ")))));
}
exports.ConnectionBar = ConnectionBar;
