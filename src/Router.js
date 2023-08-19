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
exports.MyRouter = exports.router = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var SSHActionFlowListComponent_1 = require("./components/ssh/SSHActionFlowListComponent");
var SSHCreate_1 = require("./components/ssh/SSHCreate");
var SSHList_1 = require("./components/ssh/SSHList");
var Login_1 = require("./components/user/Login");
var Register_1 = require("./components/user/Register");
var isLockSlice_1 = require("./store/global/isLockSlice");
var SSHAction_1 = require("./components/ssh/sshActions/SSHAction");
var SSHOutput_1 = require("./components/ssh/SSHOutput");
var SSHDeleteList_1 = require("./components/ssh/SSHDeleteList");
var XtermContainer_1 = require("./components/xtermShell/XtermContainer");
var Shell_1 = require("./components/shell/Shell");
exports.router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: "/",
        element: react_1.default.createElement(RegisterRoute, null),
    },
    {
        path: "/login",
        element: react_1.default.createElement(LoginRoute, null),
    },
    {
        path: "/dashboard",
        element: react_1.default.createElement(DashboardRoute, null)
    }
]);
var MyRouter = function (props) {
    console.log(props.url);
    (0, react_1.useEffect)(function () {
    }, [props.url]);
    switch (props.url) {
        case (isLockSlice_1.routeUris.register):
            window.history.pushState(isLockSlice_1.routeUris.register, isLockSlice_1.routeUris.register, isLockSlice_1.routeUris.register);
            window.history.replaceState(isLockSlice_1.routeUris.register, isLockSlice_1.routeUris.register, isLockSlice_1.routeUris.register);
            return RegisterRoute();
            break;
        case (isLockSlice_1.routeUris.login):
            window.history.pushState(isLockSlice_1.routeUris.login, isLockSlice_1.routeUris.login, isLockSlice_1.routeUris.login);
            window.history.replaceState(isLockSlice_1.routeUris.login, isLockSlice_1.routeUris.login, isLockSlice_1.routeUris.login);
            return LoginRoute();
            break;
        case (isLockSlice_1.routeUris.action):
            window.history.pushState(isLockSlice_1.routeUris.action, isLockSlice_1.routeUris.action, isLockSlice_1.routeUris.action);
            window.history.replaceState(isLockSlice_1.routeUris.action, isLockSlice_1.routeUris.action, isLockSlice_1.routeUris.action);
            return DashboardRoute();
            break;
        case (isLockSlice_1.routeUris.sshCreate):
            window.history.pushState(isLockSlice_1.routeUris.sshCreate, isLockSlice_1.routeUris.sshCreate, isLockSlice_1.routeUris.sshCreate);
            window.history.replaceState(isLockSlice_1.routeUris.sshCreate, isLockSlice_1.routeUris.sshCreate, isLockSlice_1.routeUris.sshCreate);
            return CreateSSHRoute();
        case (isLockSlice_1.routeUris.shell):
            window.history.pushState(isLockSlice_1.routeUris.shell, isLockSlice_1.routeUris.shell, isLockSlice_1.routeUris.shell);
            window.history.replaceState(isLockSlice_1.routeUris.shell, isLockSlice_1.routeUris.shell, isLockSlice_1.routeUris.shell);
            return ShellRoute();
        case (isLockSlice_1.routeUris.xtermShell):
            window.history.pushState(isLockSlice_1.routeUris.xtermShell, isLockSlice_1.routeUris.xtermShell, isLockSlice_1.routeUris.xtermShell);
            window.history.replaceState(isLockSlice_1.routeUris.xtermShell, isLockSlice_1.routeUris.xtermShell, isLockSlice_1.routeUris.xtermShell);
            return XtermShellRoute();
        default:
            window.history.pushState(isLockSlice_1.routeUris.sshCreate, isLockSlice_1.routeUris.sshCreate, isLockSlice_1.routeUris.sshCreate);
            window.history.replaceState(isLockSlice_1.routeUris.sshCreate, isLockSlice_1.routeUris.sshCreate, isLockSlice_1.routeUris.sshCreate);
            return CreateSSHRoute();
    }
    return (RegisterRoute());
};
exports.MyRouter = MyRouter;
function RegisterRoute() {
    var dispatch = (0, react_redux_1.useDispatch)();
    dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.register));
    return (react_1.default.createElement("div", { className: "h-screen" },
        react_1.default.createElement("div", { className: "flex items-center justify-center h-2/3" },
            react_1.default.createElement("div", { className: "h-min w-3/5" },
                react_1.default.createElement(Register_1.Register, null)))));
}
function LoginRoute() {
    var dispatch = (0, react_redux_1.useDispatch)();
    dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.login));
    return (react_1.default.createElement("div", { className: "h-screen" },
        react_1.default.createElement("div", { className: "flex items-center justify-center h-2/3" },
            react_1.default.createElement("div", { className: "h-min w-3/5" },
                react_1.default.createElement(Login_1.Login, null)))));
}
function DashboardRoute() {
    var dispatch = (0, react_redux_1.useDispatch)();
    dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.action));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "grid grid-cols-2" },
            react_1.default.createElement("div", { className: "m-3" },
                react_1.default.createElement(SSHList_1.ListSSH, null),
                "                                        "),
            react_1.default.createElement("div", { className: "m-3" },
                react_1.default.createElement(SSHAction_1.SSHActionComponent, null),
                "                 "),
            react_1.default.createElement("div", { className: "m-3" },
                react_1.default.createElement(SSHOutput_1.SSHOutput, null),
                "                                    "),
            react_1.default.createElement("div", { className: "m-3" },
                react_1.default.createElement(SSHActionFlowListComponent_1.SSHActionFlowListComponent, null),
                "  "))));
}
function CreateSSHRoute() {
    var dispatch = (0, react_redux_1.useDispatch)();
    dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.sshCreate));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "m-3" },
            react_1.default.createElement(SSHCreate_1.SSHCreate, null),
            "                                    "),
        react_1.default.createElement("div", { className: "m-3" },
            react_1.default.createElement(SSHList_1.ListSSH, null),
            "                                        "),
        react_1.default.createElement("div", { className: "m-3" },
            react_1.default.createElement(SSHDeleteList_1.SSHDeleteList, null),
            "                            ")));
}
function ShellRoute() {
    var dispatch = (0, react_redux_1.useDispatch)();
    dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.shell));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Shell_1.Shell, null)));
}
function XtermShellRoute() {
    var dispatch = (0, react_redux_1.useDispatch)();
    dispatch((0, isLockSlice_1.setRoute)(isLockSlice_1.routeUris.xtermShell));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(XtermContainer_1.XtermContainer, null)));
}
