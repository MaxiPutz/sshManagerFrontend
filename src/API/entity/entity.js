"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHTarget = exports.SSHAction = void 0;
var SSHAction;
(function (SSHAction) {
    SSHAction["SSHCommand"] = "SSHCommand";
    SSHAction["SSHCopyFileFromRemote"] = "SSHCopyFileFromRemote";
    SSHAction["SSHCopyFileToRemote"] = "SSHCopyFileToRemote";
})(SSHAction || (exports.SSHAction = SSHAction = {}));
var SSHTarget;
(function (SSHTarget) {
    SSHTarget["File"] = "File";
    SSHTarget["Folder"] = "Folder";
    SSHTarget["Execute"] = "Execute";
})(SSHTarget || (exports.SSHTarget = SSHTarget = {}));
