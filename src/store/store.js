"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var userSlice_1 = require("./userSlice/userSlice");
var sshSlice_1 = require("./sshSlice/sshSlice");
var sshExeSlice_1 = require("./sshSlice/sshExeSlice");
var sshActionFlowSlice_1 = require("./sshSlice/sshActionFlowSlice");
var isLockSlice_1 = require("./global/isLockSlice");
var shell_1 = require("./shell/shell");
var xtermShell_1 = require("./shell/xtermShell");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        user: userSlice_1.userReducer,
        sshs: sshSlice_1.sshReducer,
        sshExe: sshExeSlice_1.sshExeReducer,
        sshActionFlow: sshActionFlowSlice_1.sshActionFlowReducer,
        shell: shell_1.shellReducer,
        xtermShell: xtermShell_1.xtermShellReducer,
        global: isLockSlice_1.globalReducer,
    }
});
