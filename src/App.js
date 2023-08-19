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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var userSlice_1 = require("./store/userSlice/userSlice");
var login_1 = require("./API/login/login");
var isLockSlice_1 = require("./store/global/isLockSlice");
var Router_1 = require("./Router");
var user_1 = require("./API/user/user");
function App() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var selectRoute = (0, react_redux_1.useSelector)(isLockSlice_1.selectGlobal.getRoute);
    var selectUser = (0, react_redux_1.useSelector)(userSlice_1.select.getUser);
    var _a = (0, react_1.useState)(false), isSettingsVisible = _a[0], setIsSettingVisible = _a[1];
    (0, react_1.useEffect)(function () {
        try {
            var user = JSON.parse(document.cookie).user;
            console.log("form cookie", user);
            if (user != undefined && selectUser.Name === "") {
                (0, login_1.initState)(user, dispatch);
            }
        }
        catch (_a) {
        }
    }, []);
    var hanldeOptionVisible = function () {
        isSettingsVisible ? setIsSettingVisible(false) : setIsSettingVisible(true);
        console.log(isSettingsVisible);
    };
    var handleLogout = function () {
        document.cookie = JSON.stringify({
            user: undefined
        });
        location.reload();
    };
    var hanldeDeleteAccount = function () {
        console.log("try to delete");
        (0, user_1.userDelete)(selectUser).then(function (ele) {
            console.log(ele);
            return ele.json();
        }).then(function (json) {
            console.log(json);
            alert("deleting success");
            location.reload();
        }).catch(function () {
            alert("somthing went wrong contact the developer!");
        });
    };
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("ul", { className: "overflow-hidden bg-blue-500 m-0 p-0 list-none" },
            react_1.default.createElement("li", { className: "float-left p-5" + ((selectRoute === isLockSlice_1.routeUris.register) ? " bg-black" : "") },
                "          ",
                react_1.default.createElement("button", { onClick: function () { return dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.register)); }, className: "text-white" }, "         Register        ")),
            react_1.default.createElement("li", { className: "float-left p-5" + ((selectRoute === isLockSlice_1.routeUris.login) ? " bg-black" : "") },
                "     ",
                react_1.default.createElement("button", { onClick: function () { return dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.login)); }, className: "text-white" }, "     Login                ")),
            react_1.default.createElement("li", { className: "float-left p-5" + ((selectRoute === isLockSlice_1.routeUris.sshCreate) ? " bg-black" : "") },
                " ",
                react_1.default.createElement("button", { onClick: function () { return dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.sshCreate)); }, className: "text-white" }, " SSH Create/Delete                ")),
            react_1.default.createElement("li", { className: "float-left p-5" + ((selectRoute === isLockSlice_1.routeUris.action) ? " bg-black" : "") },
                " ",
                react_1.default.createElement("button", { onClick: function () { return dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.action)); }, className: "text-white" }, " Batch                 ")),
            react_1.default.createElement("li", { className: "float-left p-5" + ((selectRoute === isLockSlice_1.routeUris.xtermShell) ? " bg-black" : "") },
                " ",
                react_1.default.createElement("button", { onClick: function () { return dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.xtermShell)); }, className: "text-white" }, " Shell                ")),
            selectUser.Name !== "" ?
                (react_1.default.createElement("li", { className: "float-right p-3 text-white" },
                    " Logged in as: ",
                    react_1.default.createElement("span", { className: "text-2xl m-3" },
                        react_1.default.createElement(UserSettingButton, { user: selectUser, handleOption: hanldeOptionVisible }),
                        react_1.default.createElement(UserSettingActions, { isHidden: !isSettingsVisible, user: selectUser, handleSingOut: handleLogout, hanldeDeleteAccount: hanldeDeleteAccount }))))
                :
                    react_1.default.createElement(react_1.default.Fragment, null)),
        react_1.default.createElement("div", { className: "" },
            react_1.default.createElement(Router_1.MyRouter, { url: selectRoute }))));
}
exports.default = App;
function UserSettingButton(props) {
    return (react_1.default.createElement("span", { className: "float-right" },
        react_1.default.createElement("button", { onClick: props.handleOption, type: "button", className: "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50", id: "menu-button", "aria-expanded": "true", "aria-haspopup": "true" },
            props.user.Name,
            react_1.default.createElement("svg", { className: "-mr-1 h-5 w-5 text-gray-400", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                react_1.default.createElement("path", { "fill-rule": "evenodd", d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z", "clip-rule": "evenodd" })))));
}
function UserSettingActions(props) {
    return (react_1.default.createElement("div", { hidden: props.isHidden, className: "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "menu-button" },
        react_1.default.createElement("div", { className: "py-1", role: "none" },
            react_1.default.createElement("button", { onClick: props.handleSingOut, type: "submit", className: "text-gray-700 block w-full px-4 py-2 text-left text-sm", role: "menuitem", id: "menu-item-3" }, "Sign out"),
            react_1.default.createElement("button", { onClick: props.hanldeDeleteAccount, type: "submit", className: "text-gray-700 block w-full px-4 py-2 text-left text-sm", role: "menuitem", id: "menu-item-3" }, "Delete Account"))));
}
