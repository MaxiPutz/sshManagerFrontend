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
exports.selectShell = exports.setIsNextDirElement = exports.setDirElements = exports.addHistory = exports.setSessionShellOutput = exports.updateOutput = exports.setShellSession = exports.shellReducer = exports.isNextDirElementMap = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    sessions: []
};
exports.isNextDirElementMap = new Map();
var shellSlice = (0, toolkit_1.createSlice)({
    initialState: initialState,
    name: "shell",
    reducers: {
        setShellSession: function (state, action) {
            state.sessions = __spreadArray([], action.payload, true);
        },
        updateOutput: function (state, action) {
            var newSessions = state.sessions.reduce(function (prev, curr) {
                if (curr.UUID !== action.payload.id) {
                    return __spreadArray(__spreadArray([], prev, true), [curr], false);
                }
                var output = __spreadArray(__spreadArray([], curr.output, true), [action.payload.msg], false);
                if ((output.length > 2) && (curr.shellHistory === undefined)) {
                    curr.shellHistory = output[2].split("\n");
                    output[2] = action.payload.msg.split("\n")[action.payload.msg.split("\n").length - 2];
                }
                return __spreadArray(__spreadArray([], prev, true), [__assign(__assign({}, curr), { output: output })], false);
            }, []);
            state.sessions = newSessions;
        },
        setSessionShellOutput: function (state, action) {
            var newSessions = state.sessions.reduce(function (prev, curr) { return curr.UUID === action.payload.UUID ? __spreadArray(__spreadArray([], prev, true), [__assign(__assign({}, curr), { output: action.payload.output })], false) : __spreadArray(__spreadArray([], prev, true), [curr], false); }, []);
            console.log("set session", newSessions);
            state.sessions = newSessions;
        },
        addHistory: function (state, action) {
            var newSessions = state.sessions.reduce(function (prev, curr) {
                var _a;
                return curr.UUID === action.payload.id ? __spreadArray(__spreadArray([], prev, true), [__assign(__assign({}, curr), { shellHistory: __spreadArray(__spreadArray([], (_a = curr.shellHistory) !== null && _a !== void 0 ? _a : [], true), [action.payload.msg], false) })], false) : __spreadArray(__spreadArray([], prev, true), [curr], false);
            }, []);
            console.log("set session", newSessions);
            state.sessions = newSessions;
        },
        setDirElements: function (state, action) {
            var newSessions = state.sessions.reduce(function (prev, curr) { return curr.UUID === action.payload.id ? __spreadArray(__spreadArray([], prev, true), [__assign(__assign({}, curr), { dirElements: action.payload.msg })], false) : __spreadArray(__spreadArray([], prev, true), [curr], false); }, []);
            console.log("set session", newSessions);
            state.sessions = newSessions;
        },
        setIsNextDirElement: function (state, action) {
            exports.isNextDirElementMap.set(action.payload.id, action.payload);
            var newSessions = state.sessions.reduce(function (prev, curr) { return curr.UUID === action.payload.id ? __spreadArray(__spreadArray([], prev, true), [__assign(__assign({}, curr), { isNextDirElement: action.payload.msg })], false) : __spreadArray(__spreadArray([], prev, true), [curr], false); }, []);
            console.log("set session", newSessions);
            state.sessions = newSessions;
        }
    }
});
exports.shellReducer = shellSlice.reducer;
exports.setShellSession = (_a = shellSlice.actions, _a.setShellSession), exports.updateOutput = _a.updateOutput, exports.setSessionShellOutput = _a.setSessionShellOutput, exports.addHistory = _a.addHistory, exports.setDirElements = _a.setDirElements, exports.setIsNextDirElement = _a.setIsNextDirElement;
exports.selectShell = {
    getSessions: function (state) { return state.shell.sessions; }
};
