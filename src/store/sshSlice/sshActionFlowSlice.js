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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSSHActionFlow = exports.sshActionFlowReducer = exports.addSSHActionFlow = exports.setSSHActionFlow = exports.sshActionFlowSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    actions: {}
};
exports.sshActionFlowSlice = (0, toolkit_1.createSlice)({
    initialState: initialState,
    reducers: {
        setSSHActionFlow: function (state, action) {
            state.actions = action.payload;
        },
        addSSHActionFlow: function (state, action) {
            console.log(action.payload);
            state.actions = __assign(__assign({}, state.actions), action.payload);
        }
    },
    name: "sshActionFlow"
});
exports.setSSHActionFlow = (_a = exports.sshActionFlowSlice.actions, _a.setSSHActionFlow), exports.addSSHActionFlow = _a.addSSHActionFlow;
exports.sshActionFlowReducer = exports.sshActionFlowSlice.reducer;
exports.selectSSHActionFlow = {
    getAction: function (state) { return state.sshActionFlow.actions; }
};
