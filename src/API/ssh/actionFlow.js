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
exports.actionFlowDelete = exports.actionFlowSave = exports.actionFlowGetAll = void 0;
var entity_1 = require("../entity/entity");
var serverAdress_1 = require("../serverAdress");
var sshActionFlowSlice_1 = require("../../store/sshSlice/sshActionFlowSlice");
function parseToCommand(actionflowStruct) {
    return actionflowStruct.reduce(function (map, cur) {
        var _a;
        console.log(cur);
        var key = "".concat(cur.ActionName, "_").concat(cur.UUID);
        var cmd = (cur.Action == entity_1.SSHAction.SSHCommand) ? {
            Action: cur.Action,
            Command: cur.Command,
            Index: cur.Index,
            Target: cur.Target
        }
            : {
                Action: cur.Action,
                Index: cur.Index,
                Target: cur.Target,
                Destination_Dir: cur.Destination_Dir,
                Source_Dir: cur.Source_Dir
            };
        if (map.has(key))
            (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.push(cmd);
        else {
            map.set(key, [cmd]);
        }
        return map;
    }, new Map);
}
var actionFlowGetAll = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var url, res, json, ele, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = serverAdress_1.getUrl + "/ssh/actionFlow/getAll";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(url, {
                        method: "POST",
                        headers: {
                            'Authorization': 'Basic ' + btoa("".concat(user.Name, ":").concat(user.Password))
                        },
                    })];
            case 2:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 3:
                json = _a.sent();
                console.log(json);
                ele = parseToCommand(json);
                return [2 /*return*/, ele];
            case 4:
                error_1 = _a.sent();
                console.log("this is a issue");
                throw new Error("Failed to connect");
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.actionFlowGetAll = actionFlowGetAll;
var actionFlowSave = function (user, sshInfos, commands, actionName) { return __awaiter(void 0, void 0, void 0, function () {
    var url, merge;
    return __generator(this, function (_a) {
        url = serverAdress_1.getUrl + "/ssh/actionFlow/create";
        merge = __assign(__assign({ sshInfos: sshInfos }, user), { commands: commands, ActionName: actionName });
        try {
            return [2 /*return*/, fetch(url, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Basic ' + btoa("".concat(user.Name, ":").concat(user.Password))
                    },
                    body: JSON.stringify(merge)
                })];
        }
        catch (error) {
            console.log("this is a issue");
            throw new Error("Failed to connect");
        }
        return [2 /*return*/];
    });
}); };
exports.actionFlowSave = actionFlowSave;
var actionFlowDelete = function (user, command, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var url, res, actionFlows, obj_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = serverAdress_1.getUrl + "/ssh/actionFlow/delete";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (command.UUID === undefined) {
                    throw new Error("no able to get uuid");
                }
                return [4 /*yield*/, fetch(url, {
                        method: "POST",
                        headers: {
                            'Authorization': 'Basic ' + btoa("".concat(user.Name, ":").concat(user.Password))
                        },
                        body: JSON.stringify({ UUID: command.UUID })
                    })];
            case 2:
                res = _a.sent();
                if (!(dispatch != undefined)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, exports.actionFlowGetAll)(user)];
            case 3:
                actionFlows = _a.sent();
                obj_1 = {};
                actionFlows.forEach(function (val, key) {
                    obj_1[key.split("_")[0]] = val.map(function (ele) { return (__assign(__assign({}, ele), { UUID: key.split("_")[1] })); });
                });
                console.log("debug for actionflow set");
                dispatch((0, sshActionFlowSlice_1.setSSHActionFlow)(obj_1));
                _a.label = 4;
            case 4: return [2 /*return*/, res];
            case 5:
                error_2 = _a.sent();
                console.log("this is a issue");
                throw new Error("Failed to connect");
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.actionFlowDelete = actionFlowDelete;
