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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHExe = void 0;
const react_1 = __importStar(require("react"));
const entity_1 = require("../../../API/entity/entity");
const sshSlice_1 = require("../../../store/sshSlice/sshSlice");
const userSlice_1 = require("../../../store/userSlice/userSlice");
const sshExeSlice_1 = require("../../../store/sshSlice/sshExeSlice");
const react_redux_1 = require("react-redux");
const exeCute_1 = require("../../../API/ssh/exeCute");
function SSHExe() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const sshInfo = (0, react_redux_1.useSelector)(sshSlice_1.select.getSelectedSSH);
    const user = (0, react_redux_1.useSelector)(userSlice_1.select.getUser);
    const [inputVal, setInputVal] = (0, react_1.useState)(new Array(sshInfo.length));
    const [inputExe, setInputExe] = (0, react_1.useState)(new Array(1).fill(true));
    const inputExeInfo = (0, react_redux_1.useSelector)(sshExeSlice_1.selectSSHExe.getSSHExeInfo);
    console.log(inputExeInfo);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, " SSHExe"),
        sshInfo.map((ele, i) => {
            return (react_1.default.createElement("div", { key: "SSHExe" + i },
                react_1.default.createElement("h2", null,
                    " ",
                    ele.User,
                    "@",
                    ele.IPAddress,
                    "    "),
                inputExeInfo.command.map((_, j) => (react_1.default.createElement(ExeField, { sshInfo: ele, user: user, index: j, key: j, command: inputExeInfo.command[j].Command }))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("button", { onClick: () => {
                            console.log("test");
                            dispatch((0, sshExeSlice_1.addExeInfos)(({ action: entity_1.SSHAction.SSHCommand, Command: "", Index: 0 })));
                            // setInputExe([...inputExe, true])y
                        } }, "add New input"))));
        })));
}
exports.SSHExe = SSHExe;
function ExeField(props) {
    // const [inputVal, setInputVal] = useState<string>("")
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = props.user;
    const sshInfo = props.sshInfo;
    console.log(props.index);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("input", { value: props.command, onChange: (e) => {
                let newVals = e.target.value;
                dispatch((0, sshExeSlice_1.sshExeSetCommandId)({
                    action: entity_1.SSHAction.SSHCommand,
                    Command: newVals,
                    Index: props.index
                }));
            }, onKeyDown: (e) => __awaiter(this, void 0, void 0, function* () {
                if (e.key === "Enter") {
                    try {
                        const res = yield (0, exeCute_1.sshExe)(sshInfo, {
                            action: entity_1.SSHAction.SSHCommand,
                            Command: props.command,
                            Index: props.index
                        }, user);
                        console.log(res);
                        const json = yield res.json();
                        console.log(json);
                        dispatch((0, sshSlice_1.setSSHOutput)(json));
                    }
                    catch (error) {
                        alert("can not execute");
                    }
                }
            }) }),
        props.index === 0 ? "" : react_1.default.createElement("button", { onClick: () => dispatch((0, sshExeSlice_1.sshExeRemoveId)(props.index)) }, "remove")));
}
