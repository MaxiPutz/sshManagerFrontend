"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = exports.sshProtocol = exports.protocol = exports.port = exports.ip = void 0;
var dev = true;
exports.ip = dev ? "192.168.0.171" : "localhost";
exports.port = dev ? "8080" : "8080";
exports.protocol = dev ? "http" : "http";
exports.sshProtocol = dev ? "ws" : "ws";
exports.getUrl = "".concat(exports.protocol, "://").concat(exports.ip, ":").concat(exports.port);
