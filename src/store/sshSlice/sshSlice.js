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
exports.sshReducer = exports.select = exports.setOutputFromSHHInfo = exports.addSSH = exports.setSelectedSSH = exports.setSSH = exports.sshSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.sshSlice = (0, toolkit_1.createSlice)({
    initialState: {
        arr: [],
        selected: [],
        sshInfoOutput: []
    },
    name: "ssh",
    reducers: {
        setOutputFromSHHInfo: function (state, action) {
            console.log(action);
            if (state.selected.length != state.sshInfoOutput.length) {
                state.sshInfoOutput = state.selected.reduce(function (prev, curr, i) { return action.payload.selectedIndex === i ? __spreadArray(__spreadArray([], prev, true), [action.payload], false) : __spreadArray(__spreadArray([], prev, true), [{
                        output: "",
                        selectedIndex: i,
                        sshInfo: __assign(__assign({}, curr), { index: i })
                    }], false); }, []);
            }
            else {
                state.sshInfoOutput = state.sshInfoOutput.reduce(function (prev, curr, i) { return action.payload.selectedIndex === i ? __spreadArray(__spreadArray([], prev, true), [action.payload], false) : __spreadArray(__spreadArray([], prev, true), [curr], false); }, []);
            }
        },
        setSSH: function (state, action) {
            console.log("action", action);
            state.arr = __spreadArray([], action.payload, true);
        },
        setSelectedSSH: function (state, action) {
            state.selected = __spreadArray([], action.payload, true);
        },
        addSSH: function (state, action) {
            state.arr = __spreadArray(__spreadArray([], state.arr, true), [action.payload], false);
        }
    }
});
exports.setSSH = (_a = exports.sshSlice.actions, _a.setSSH), exports.setSelectedSSH = _a.setSelectedSSH, exports.addSSH = _a.addSSH, exports.setOutputFromSHHInfo = _a.setOutputFromSHHInfo;
exports.select = {
    getSSH: function (state) { return state.sshs.arr; },
    getSelectedSSH: function (state) { return state.sshs.selected; },
    getOutput: function (state) { return state.sshs.sshInfoOutput; }
};
exports.sshReducer = exports.sshSlice.reducer;
