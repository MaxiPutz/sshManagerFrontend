"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectGlobal = exports.setRoute = exports.setIsLock = exports.globalReducer = exports.global = exports.routeUris = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var routeUris;
(function (routeUris) {
    routeUris["login"] = "/login";
    routeUris["register"] = "/";
    routeUris["action"] = "/dashboard";
    routeUris["sshCreate"] = "/sshCreate";
    routeUris["shell"] = "/shell";
    routeUris["xtermShell"] = "/xtermShell";
})(routeUris = exports.routeUris || (exports.routeUris = {}));
var initialState = {
    isLook: false,
    route: routeUris.register
};
exports.global = (0, toolkit_1.createSlice)({
    initialState: initialState,
    name: "global",
    reducers: {
        setIsLock: function (state, action) {
            state.isLook = action.payload;
        },
        setRoute: function (state, action) {
            state.route = action.payload;
        }
    }
});
exports.globalReducer = exports.global.reducer;
exports.setIsLock = (_a = exports.global.actions, _a.setIsLock), exports.setRoute = _a.setRoute;
exports.selectGlobal = {
    getIslook: function (state) { return state.global.isLook; },
    getRoute: function (state) { return state.global.route; }
};
