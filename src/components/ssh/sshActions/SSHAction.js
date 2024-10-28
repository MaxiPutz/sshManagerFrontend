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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHActionWraper = exports.SSHActionComponent = void 0;
var react_1 = __importStar(require("react"));
var entity_1 = require("../../../API/entity/entity");
var sshSlice_1 = require("../../../store/sshSlice/sshSlice");
var userSlice_1 = require("../../../store/userSlice/userSlice");
var sshExeSlice_1 = require("../../../store/sshSlice/sshExeSlice");
var react_redux_1 = require("react-redux");
var SSHCommandComponent_1 = require("./SSHCommandComponent");
var SSHCopyFileToRemoteComponent_1 = require("./SSHCopyFileToRemoteComponent");
var SSHCopyFileFromRemoteComponent_1 = require("./SSHCopyFileFromRemoteComponent");
var actionFlow_1 = require("../../../API/ssh/actionFlow");
var Button_1 = require("../../basic/Button");
var isLockSlice_1 = require("../../../store/global/isLockSlice");
var sshActionFlowSlice_1 = require("../../../store/sshSlice/sshActionFlowSlice");
function SSHActionComponent() {
    var _this = this;
    var saveActionTexFieldRef = (0, react_1.useRef)(null);
    var dispatch = (0, react_redux_1.useDispatch)();
    var sshInfo = (0, react_redux_1.useSelector)(sshSlice_1.select.getSelectedSSH);
    var user = (0, react_redux_1.useSelector)(userSlice_1.select.getUser);
    var isLock = (0, react_redux_1.useSelector)(isLockSlice_1.selectGlobal.getIslook) || user.Name === "";
    var inputExeInfo = (0, react_redux_1.useSelector)(sshExeSlice_1.selectSSHExe.getSSHExeInfo);
    var saveHandler = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, json, error_1;
        var _a;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 3, , 4]);
                    dispatch((0, isLockSlice_1.setIsLock)(true));
                    return [4 /*yield*/, (0, actionFlow_1.actionFlowSave)(user, sshInfo, inputExeInfo.command, (_c = (_b = saveActionTexFieldRef.current) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : "no Name found")]; // sshInfo not yet supported
                case 1:
                    res = _f.sent() // sshInfo not yet supported
                    ;
                    console.log(res);
                    return [4 /*yield*/, res.json()];
                case 2:
                    json = _f.sent();
                    console.log(json);
                    alert("saved success");
                    dispatch((0, isLockSlice_1.setIsLock)(false));
                    dispatch((0, sshActionFlowSlice_1.addSSHActionFlow)((_a = {},
                        _a[(_e = (_d = saveActionTexFieldRef.current) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : "no Name found"] = json,
                        _a)));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _f.sent();
                    alert("faild to Save");
                    dispatch((0, isLockSlice_1.setIsLock)(false));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", { className: "font-bold text-3xl" }, " SSH Action"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "relative" },
                react_1.default.createElement(Button_1.Label, null, "Action Flow name:"),
                react_1.default.createElement(Button_1.TextField, { isLock: isLock, inputRef: saveActionTexFieldRef }),
                react_1.default.createElement("div", { className: "flex m-2 justify-center" },
                    react_1.default.createElement(Button_1.Button, { className: "w-2/3", isLock: isLock, onClick: saveHandler }, "save action flow to db"))),
            inputExeInfo.command.map(function (command, j) { return (react_1.default.createElement(SSHActionWraper, { isImmutable: false, command: command, user: user, key: j })); }),
            react_1.default.createElement("div", { className: "flex justify-center m-2" },
                react_1.default.createElement(Button_1.Button, { className: "w-2/3", isLock: isLock, onClick: function () {
                        dispatch((0, sshExeSlice_1.addExeInfos)(({ Action: entity_1.SSHAction.SSHCommand, Target: entity_1.SSHTarget.Execute, Command: "", Index: 0 })));
                        // setInputExe([...inputExe, true])y
                    } }, "add new input")))));
}
exports.SSHActionComponent = SSHActionComponent;
function SSHActionWraper(props) {
    var selectedComponent = react_1.default.createElement("h1", null, "element not found");
    switch (props.command.Action) {
        case entity_1.SSHAction.SSHCommand:
            var val1 = props.command;
            selectedComponent = react_1.default.createElement(SSHCommandComponent_1.SSHCommandComponent, { isImmutable: props.isImmutable, command: val1, user: props.user });
            break;
        case entity_1.SSHAction.SSHCopyFileToRemote:
            var val2 = props.command;
            selectedComponent = react_1.default.createElement(SSHCopyFileToRemoteComponent_1.SSHCopyFileToRemoteComponent, { isImmutable: props.isImmutable, command: val2, user: props.user });
            break;
        case entity_1.SSHAction.SSHCopyFileFromRemote:
            var val3 = props.command;
            selectedComponent = react_1.default.createElement(SSHCopyFileFromRemoteComponent_1.SSHCopyFileFromRemoteComponent, { isImmutable: props.isImmutable, command: val3, user: props.user });
            break;
        default:
            return react_1.default.createElement("h1", null, "element not found");
            break;
    }
    return SSHActionContainer(selectedComponent, props.command, props.isImmutable);
}
exports.SSHActionWraper = SSHActionWraper;
function SSHActionContainer(selectedActionComponent, command, isImmutable) {
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleSelect = function (e) {
        switch (e.target.value) {
            case entity_1.SSHAction.SSHCommand:
                dispatch((0, sshExeSlice_1.setActionType)({ command: command, sshAction: entity_1.SSHAction.SSHCommand, target: entity_1.SSHTarget.Execute }));
                break;
            case entity_1.SSHAction.SSHCopyFileFromRemote:
                dispatch((0, sshExeSlice_1.setActionType)({ command: command, sshAction: entity_1.SSHAction.SSHCopyFileFromRemote, target: entity_1.SSHTarget.File }));
                break;
            case entity_1.SSHAction.SSHCopyFileToRemote:
                dispatch((0, sshExeSlice_1.setActionType)({ command: command, sshAction: entity_1.SSHAction.SSHCopyFileToRemote, target: entity_1.SSHTarget.File }));
                break;
            default:
                console.log(e.target);
        }
    };
    return (react_1.default.createElement("div", { className: "grid-cols-5 grid gap-4" },
        react_1.default.createElement(Button_1.Select, { isLook: isImmutable, onChange: handleSelect },
            react_1.default.createElement("option", { selected: entity_1.SSHAction.SSHCommand === command.Action, value: entity_1.SSHAction.SSHCommand }, "exe"),
            react_1.default.createElement("option", { selected: entity_1.SSHAction.SSHCopyFileFromRemote === command.Action, value: entity_1.SSHAction.SSHCopyFileFromRemote }, "copy file from  remote"),
            react_1.default.createElement("option", { selected: entity_1.SSHAction.SSHCopyFileToRemote === command.Action, value: entity_1.SSHAction.SSHCopyFileToRemote }, "copy file to remote")),
        react_1.default.createElement("div", { className: "col-span-4" }, selectedActionComponent)));
}
