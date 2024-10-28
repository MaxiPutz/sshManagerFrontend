"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = exports.sshProtocol = exports.protocol = exports.port = exports.ip = void 0;
var dev = false;
exports.ip = dev ? "192.168.0.236" : "maximilianputz.at";
exports.port = dev ? "8080" : "8081";
exports.protocol = dev ? "http" : "http";
exports.sshProtocol = dev ? "ws" : "ws";
exports.getUrl = "".concat(exports.protocol, "://").concat(exports.ip, ":").concat(exports.port);
