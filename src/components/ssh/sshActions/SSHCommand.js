"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHCommandComponent = void 0;
const react_redux_1 = require("react-redux");
const entity_1 = require("../../../API/entity/entity");
const exeCute_1 = require("../../../API/ssh/exeCute");
const sshExeSlice_1 = require("../../../store/sshSlice/sshExeSlice");
const react_1 = __importDefault(require("react"));
function SSHCommandComponent(props) {
    // const [inputVal, setInputVal] = useState<string>("")
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = props.user;
    const sshInfo = props.sshInfo;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("input", { value: props.command.Command, onChange: (e) => {
                let newVals = e.target.value;
                dispatch((0, sshExeSlice_1.sshExeSetCommandId)({
                    action: entity_1.SSHAction.SSHCommand,
                    Command: newVals,
                    Index: props.command.Index
                }));
            }, onKeyDown: (e) => __awaiter(this, void 0, void 0, function* () {
                if (e.key === "Enter") {
                    try {
                        const res = yield (0, exeCute_1.sshExe)(sshInfo, {
                            action: entity_1.SSHAction.SSHCommand,
                            Command: props.command.Command,
                            Index: props.command.Index
                        }, user);
                        console.log(res);
                        const json = yield res.json();
                        console.log(json);
                        dispatch((0, sshExeSlice_1.setSSHOutput)(json));
                    }
                    catch (error) {
                        alert("can not execute");
                    }
                }
            }) }),
        props.command.Index === 0 ? "" : react_1.default.createElement("button", { onClick: () => dispatch((0, sshExeSlice_1.sshExeRemoveId)(props.command.Index)) }, "remove")));
}
exports.SSHCommandComponent = SSHCommandComponent;
