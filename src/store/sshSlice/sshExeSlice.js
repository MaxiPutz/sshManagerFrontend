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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sshExeReducer = exports.selectSSHExe = exports.setActionType = exports.sshExeSetCommandId = exports.addExeInfos = exports.setExeInfos = exports.sshExeRemoveId = exports.sshExeSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var entity_1 = require("../../API/entity/entity");
var initCommand = {
    Action: entity_1.SSHAction.SSHCommand,
    Command: "",
    Index: 0,
    Target: entity_1.SSHTarget.Execute
};
var exeInfos = {
    command: [initCommand],
    sshinfos: [],
    user: {
        Name: "",
        Password: "",
        Email: ""
    }
};
exports.sshExeSlice = (0, toolkit_1.createSlice)({
    initialState: {
        exeInfos: exeInfos,
    },
    name: "sshExe",
    reducers: {
        setExeInfos: function (state, action) {
            state.exeInfos = __assign({}, action.payload);
        },
        setActionType: function (state, action) {
            state.exeInfos.command = state.exeInfos.command.reduce(function (prev, cur) {
                cur.Action = cur.Index == action.payload.command.Index ? action.payload.sshAction : cur.Action;
                cur.Target = cur.Index == action.payload.command.Index ? action.payload.target : cur.Target;
                return __spreadArray(__spreadArray([], prev, true), [cur], false);
            }, []);
        },
        addExeInfos: function (state, action) {
            console.log(action);
            action.payload.Index = state.exeInfos.command.length;
            console.log("huögo");
            state.exeInfos = __assign({}, state.exeInfos);
            state.exeInfos.command = __spreadArray(__spreadArray([], state.exeInfos.command, true), [action.payload], false);
        },
        sshExeRemoveId: function (state, action) {
            var removed = 0;
            state.exeInfos.command = state.exeInfos.command.reduce(function (preVal, currVal, index) {
                console.log(index);
                if (index === action.payload) {
                    removed++;
                    return __spreadArray([], preVal, true);
                }
                currVal.Index = index - removed;
                return __spreadArray(__spreadArray([], preVal, true), [currVal], false);
            }, []);
            state.exeInfos = __assign({}, state.exeInfos);
        },
        sshExeSetCommandId: function (state, action) {
            state.exeInfos.command[action.payload.Index] = action.payload;
            state = __assign({}, state);
        },
    }
});
exports.sshExeRemoveId = (_a = exports.sshExeSlice.actions, _a.sshExeRemoveId), exports.setExeInfos = _a.setExeInfos, exports.addExeInfos = _a.addExeInfos, exports.sshExeSetCommandId = _a.sshExeSetCommandId, exports.setActionType = _a.setActionType;
exports.selectSSHExe = {
    getSSHExeInfo: function (state) { return state.sshExe.exeInfos; }
};
exports.sshExeReducer = exports.sshExeSlice.reducer;
