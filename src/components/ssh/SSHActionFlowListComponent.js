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
exports.SSHActionFlowListComponent = void 0;
var react_1 = __importStar(require("react"));
var SSHAction_1 = require("./sshActions/SSHAction");
var react_redux_1 = require("react-redux");
var sshActionFlowSlice_1 = require("../../store/sshSlice/sshActionFlowSlice");
var userSlice_1 = require("../../store/userSlice/userSlice");
var Button_1 = require("../basic/Button");
var actionFlow_1 = require("../../API/ssh/actionFlow");
function SSHActionFlowListComponent() {
    var _a = (0, react_1.useState)(0), getIndex = _a[0], setIndex = _a[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var user = (0, react_redux_1.useSelector)(userSlice_1.select.getUser);
    var sshActionCommandList = (0, react_redux_1.useSelector)(sshActionFlowSlice_1.selectSSHActionFlow.getAction);
    var headers = Object.keys(sshActionCommandList);
    var arr = Object.values(sshActionCommandList);
    if (arr.length == 0) {
        return (react_1.default.createElement("div", null));
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", { className: "text-3xl font-bold mt-3 mb-3" }, " Selected SSH Actionflow "),
        react_1.default.createElement(Button_1.Select, { onChange: function (e) { return setIndex(Number(e.target.value)); } }, headers.map(function (ele, key) { return (react_1.default.createElement("option", { value: key, key: key }, ele)); })),
        arr[getIndex].map(function (ele, i) { return (react_1.default.createElement(SSHAction_1.SSHActionWraper, { isImmutable: true, command: ele, user: user, key: i })); }),
        react_1.default.createElement("div", { className: "flex justify-center" },
            react_1.default.createElement(Button_1.Button, { className: "w-3/5 m-3", onClick: function () {
                    var command = arr[getIndex][0];
                    setIndex(0);
                    (0, actionFlow_1.actionFlowDelete)(user, command, dispatch).then(function (ele) {
                        return ele.json();
                    }).then(function (json) {
                        console.log(json);
                        alert("delete success");
                    }).catch(function (err) {
                        console.log(err);
                        alert("cannot delete");
                    });
                }, isLock: false }, "Delete Actionflow"))));
}
exports.SSHActionFlowListComponent = SSHActionFlowListComponent;
