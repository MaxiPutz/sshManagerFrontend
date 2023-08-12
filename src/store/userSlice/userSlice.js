"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReducer = exports.select = exports.setUser = exports.userSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.userSlice = (0, toolkit_1.createSlice)({
    initialState: {
        Name: "",
        Password: "",
        Email: ""
    },
    name: "user",
    reducers: {
        setUser: function (state, action) {
            var _a;
            console.log(action);
            state.Name = action.payload.Name;
            state.Password = action.payload.Password;
            state.Email = (_a = action.payload.Email) !== null && _a !== void 0 ? _a : "";
        }
    }
});
exports.setUser = exports.userSlice.actions.setUser;
exports.select = {
    getUser: function (state) { return state.user; }
};
exports.userReducer = exports.userSlice.reducer;
