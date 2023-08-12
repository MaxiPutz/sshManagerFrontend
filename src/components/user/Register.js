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
exports.Register = void 0;
var react_1 = __importStar(require("react"));
var user_1 = require("../../API/user/user");
var Button_1 = require("../basic/Button");
var react_redux_1 = require("react-redux");
var isLockSlice_1 = require("../../store/global/isLockSlice");
function Register() {
    var _this = this;
    var isLock = (0, react_redux_1.useSelector)(isLockSlice_1.selectGlobal.getIslook); //todo
    var usernameRef = (0, react_1.useRef)(null);
    var emailRef = (0, react_1.useRef)(null);
    var passwordRef = (0, react_1.useRef)(null);
    var password2Ref = (0, react_1.useRef)(null);
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleRegister = function () { return __awaiter(_this, void 0, void 0, function () {
        var name, pw, pw2, email, res, j, error_1;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    name = (_b = (_a = usernameRef.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
                    pw = (_d = (_c = passwordRef.current) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "";
                    pw2 = (_f = (_e = password2Ref.current) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : "";
                    email = (_h = (_g = emailRef.current) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : "";
                    if (name == "" || pw == "" || email == "") {
                        alert("not all fileds are using");
                        return [2 /*return*/];
                    }
                    else if (pw !== pw2) {
                        alert("Password field are not the same");
                        return [2 /*return*/];
                    }
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 6, , 7]);
                    dispatch((0, isLockSlice_1.setIsLock)(true));
                    return [4 /*yield*/, (0, user_1.userCreate)({
                            Email: email,
                            Name: name,
                            Password: pw
                        })];
                case 2:
                    res = _j.sent();
                    console.log(res);
                    if (!res.ok) return [3 /*break*/, 4];
                    alert("user is create");
                    return [4 /*yield*/, res.json()];
                case 3:
                    j = _j.sent();
                    console.log(j);
                    return [3 /*break*/, 5];
                case 4:
                    alert("user exist");
                    _j.label = 5;
                case 5:
                    dispatch((0, isLockSlice_1.setIsLock)(false));
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _j.sent();
                    alert("issue with the server");
                    dispatch((0, isLockSlice_1.setIsLock)(false));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", { className: "grid" },
        react_1.default.createElement("div", { className: "text-3xl font-bold" },
            react_1.default.createElement("h1", null, "Register")),
        react_1.default.createElement("div", { className: "relative" },
            react_1.default.createElement(Button_1.TextField, { isLock: isLock, inputRef: usernameRef }),
            react_1.default.createElement(Button_1.Label, null, "Username:")),
        react_1.default.createElement("div", { className: "relative" },
            react_1.default.createElement(Button_1.TextField, { isLock: isLock, inputRef: emailRef }),
            react_1.default.createElement(Button_1.Label, null, "Email:")),
        react_1.default.createElement("div", { className: "relative" },
            react_1.default.createElement(Button_1.TextField, { isLock: isLock, inputRef: passwordRef }),
            react_1.default.createElement(Button_1.Label, null, "Password:")),
        react_1.default.createElement("div", { className: "relative" },
            react_1.default.createElement(Button_1.TextField, { isLock: isLock, inputRef: password2Ref }),
            react_1.default.createElement(Button_1.Label, null, "Password:")),
        react_1.default.createElement("div", { className: "relative flex justify-center" },
            react_1.default.createElement(Button_1.Button, { className: "w-2/3 mt-3 mb-3", isLock: isLock, onClick: handleRegister }, "register"))));
}
exports.Register = Register;
// function handleRegister ()  {
//     console.log("register");
//     userCreate({
//         Email: "email",
//         Name: "name",
//         Password: "passowrd"
//     })
//     .then(ele => ele.json())
//     .then(ele => console.log(ele))
// }
