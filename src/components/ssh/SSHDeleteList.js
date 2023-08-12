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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHDeleteList = void 0;
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var sshSlice_1 = require("../../store/sshSlice/sshSlice");
var userSlice_1 = require("../../store/userSlice/userSlice");
var isLockSlice_1 = require("../../store/global/isLockSlice");
var ssh_1 = require("../../API/ssh/ssh");
var Button_1 = require("../basic/Button");
function SSHDeleteList() {
    var _this = this;
    var dispatch = (0, react_redux_1.useDispatch)();
    var sshSelectedList = (0, react_redux_1.useSelector)(sshSlice_1.select.getSelectedSSH);
    var sshList = (0, react_redux_1.useSelector)(sshSlice_1.select.getSSH);
    var isLocked = (0, react_redux_1.useSelector)(isLockSlice_1.selectGlobal.getIslook);
    var user = (0, react_redux_1.useSelector)(userSlice_1.select.getUser);
    if (sshSelectedList.length === 0) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    var delteHandler = function () {
    };
    return (react_1.default.createElement("div", { className: "border border-black border-b-2" },
        react_1.default.createElement("div", { className: "grid grid-cols-3 border-b-2 border-black gap-3" },
            react_1.default.createElement("th", null, "User"),
            react_1.default.createElement("th", null, "IPAddress"),
            react_1.default.createElement("th", null, "Actions")),
        sshSelectedList.map(function (ele, index) { return (react_1.default.createElement("div", { className: "grid grid-cols-3 gap-3" },
            react_1.default.createElement("div", { className: "flex justify-center" },
                react_1.default.createElement("div", null, ele.User)),
            react_1.default.createElement("div", { className: "flex justify-center" }, ele.IPAddress),
            react_1.default.createElement(Button_1.Button, { className: "", isLock: isLocked, onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    var res, json, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                dispatch((0, isLockSlice_1.setIsLock)(true));
                                return [4 /*yield*/, (0, ssh_1.deleteSsh)(user, ele)];
                            case 1:
                                res = _a.sent();
                                console.log(res);
                                return [4 /*yield*/, res.json()];
                            case 2:
                                json = _a.sent();
                                console.log(json);
                                dispatch((0, sshSlice_1.setSSH)(sshList.filter(function (e) { return e.ID != ele.ID; })));
                                dispatch((0, sshSlice_1.setSelectedSSH)(sshSelectedList.filter(function (_, i) { return index != i; })));
                                dispatch((0, isLockSlice_1.setIsLock)(false));
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _a.sent();
                                alert("not able to delete ssh try again");
                                dispatch((0, isLockSlice_1.setIsLock)(false));
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); } }, "Delete"))); })));
}
exports.SSHDeleteList = SSHDeleteList;
