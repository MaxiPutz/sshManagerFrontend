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
exports.SSHCreate = void 0;
var react_1 = __importStar(require("react"));
var ssh_1 = require("../../API/ssh/ssh");
var react_redux_1 = require("react-redux");
var userSlice_1 = require("../../store/userSlice/userSlice");
var Security_1 = require("../../Security/Security");
var Button_1 = require("../basic/Button");
var isLockSlice_1 = require("../../store/global/isLockSlice");
var sshSlice_1 = require("../../store/sshSlice/sshSlice");
function SSHCreate() {
    var _this = this;
    var isLock = (0, react_redux_1.useSelector)(isLockSlice_1.selectGlobal.getIslook); // todo
    var userData = (0, react_redux_1.useSelector)(userSlice_1.select.getUser);
    var dispatch = (0, react_redux_1.useDispatch)();
    var ipRef = (0, react_1.useRef)(null);
    var pwRef = (0, react_1.useRef)(null);
    var userRef = (0, react_1.useRef)(null);
    var keyRef = (0, react_1.useRef)(null);
    var getSSHInfoFromInput = function () {
        var ip = ipRef.current.value;
        var pw = pwRef.current.value;
        var user = userRef.current.value;
        var key = keyRef.current.value;
        if (ip == "" || pw == "" || user == "" || user == "") {
            alert("some filed is not filled");
            return;
        }
        var ssh = {
            IPAddress: ip,
            Key: key,
            Password: pw,
            User: user
        };
        return ssh;
    };
    var handleConnection = function () { return __awaiter(_this, void 0, void 0, function () {
        var info, res, j, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("userData", userData);
                    info = getSSHInfoFromInput();
                    console.log("userData", userData);
                    if (info == undefined) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    dispatch((0, isLockSlice_1.setIsLock)(true));
                    return [4 /*yield*/, (0, ssh_1.checkConnection)(info, userData)];
                case 2:
                    res = _a.sent();
                    console.log(res);
                    return [4 /*yield*/, res.json()];
                case 3:
                    j = _a.sent();
                    console.log(j);
                    alert("connection works");
                    dispatch((0, isLockSlice_1.setIsLock)(false));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    alert("fail to connect try check the connection to the ssh server");
                    dispatch((0, isLockSlice_1.setIsLock)(false));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var info, res, j, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    info = getSSHInfoFromInput();
                    if (info == undefined) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    dispatch((0, isLockSlice_1.setIsLock)(true));
                    return [4 /*yield*/, (0, ssh_1.create)(info, userData, Security_1.encrypt)];
                case 2:
                    res = _a.sent();
                    console.log("clear", res);
                    return [4 /*yield*/, res.json()];
                case 3:
                    j = _a.sent();
                    console.log("clear", j);
                    dispatch((0, isLockSlice_1.setIsLock)(false));
                    dispatch((0, sshSlice_1.addSSH)(__assign(__assign({}, info), { ID: j.ID })));
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    alert("faild to create try again");
                    dispatch((0, isLockSlice_1.setIsLock)(false));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", { className: "w-full flex justify-center" },
        react_1.default.createElement("div", { className: "flex w-3/5 items-center" },
            react_1.default.createElement("div", { className: "grid w-full" },
                react_1.default.createElement("h1", { className: "text-3xl font-bold" }, "Create SSH"),
                react_1.default.createElement("div", { className: "relative" },
                    react_1.default.createElement(Button_1.TextField, { inputRef: ipRef, isLock: isLock }),
                    react_1.default.createElement(Button_1.Label, null, "IP Address: ")),
                react_1.default.createElement("div", { className: "relative" },
                    react_1.default.createElement(Button_1.TextField, { inputRef: pwRef, isLock: isLock }),
                    react_1.default.createElement(Button_1.Label, null, "password: ")),
                react_1.default.createElement("div", { className: "relative" },
                    react_1.default.createElement(Button_1.TextField, { inputRef: userRef, isLock: isLock }),
                    react_1.default.createElement(Button_1.Label, null, "user: ")),
                react_1.default.createElement("div", { className: "relative" },
                    react_1.default.createElement(Button_1.TextField, { inputRef: keyRef, isLock: isLock, onChange: function (e) { return console.log(e); }, onKeyDown: function (e) { return console.log(e); } }),
                    react_1.default.createElement(Button_1.Label, null, " key:  ")),
                react_1.default.createElement("div", { className: "mt-2 flex justify-center" },
                    react_1.default.createElement(Button_1.Button, { className: "w-2/3", onClick: handleConnection, isLock: isLock }, "check connection")),
                react_1.default.createElement("div", { className: "mt-2 flex justify-center" },
                    react_1.default.createElement(Button_1.Button, { className: "w-2/3", isLock: isLock, onClick: handleSave }, "save in db"))))));
}
exports.SSHCreate = SSHCreate;
