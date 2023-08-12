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
exports.SSHOutput = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var sshSlice_1 = require("../../store/sshSlice/sshSlice");
function SSHOutput() {
    var str = (0, react_redux_1.useSelector)(sshSlice_1.select.getOutput);
    var sshInfo = (0, react_redux_1.useSelector)(sshSlice_1.select.getSelectedSSH);
    var sshInfoOutputs = (0, react_redux_1.useSelector)(sshSlice_1.select.getOutput);
    var _a = (0, react_1.useState)(undefined), output = _a[0], setOutput = _a[1];
    (0, react_1.useEffect)(function () {
        var tmp = sshInfoOutputs.map(function (ele) { return ele; }).sort(function (e1, e2) { return e2.selectedIndex - e1.selectedIndex; });
        console.log(tmp);
        setOutput(tmp[0]);
    }, [sshInfoOutputs]);
    console.log("sshoutput", str);
    var handleOuptput = function (index) {
        setOutput(sshInfoOutputs.find(function (ele) { return ele.sshInfo.index === index; }));
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", { className: "font-bold text-3xl" }, "Output"),
        react_1.default.createElement("div", { className: "" },
            react_1.default.createElement("ul", { className: "bg-gray-50 w-full overflow-hidden" }, sshInfo.map(function (sshInfo, i) {
                return (react_1.default.createElement("li", { key: "SSHAction" + i, className: "float-left mt-3 pt-3 pl-3 pr-3 " + (((output === null || output === void 0 ? void 0 : output.sshInfo.index) === i) ? "bg-white border-t-2" : "") },
                    react_1.default.createElement("button", { onClick: function () { return handleOuptput(sshInfo.index); } },
                        " ",
                        sshInfo.User,
                        "@",
                        sshInfo.IPAddress)));
            }))),
        output ? output.output : react_1.default.createElement("div", null)));
}
exports.SSHOutput = SSHOutput;
