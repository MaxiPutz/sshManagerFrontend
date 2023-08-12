"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
var crypto_js_1 = require("crypto-js");
var encrypt = function (user, sshInfo) { return _encrypt(user, sshInfo, crypto_js_1.AES.encrypt); };
exports.encrypt = encrypt;
var _encrypt = function (user, sshInfo, encryptFunc) {
    var encryptKey = user.Password;
    var sshInfoEncrypt = Object.entries(sshInfo).reduce(function (acc, _a) {
        var key = _a[0], val = _a[1];
        val = (val == null ? "undefined" : val).toString();
        acc[key] = encryptFunc(val, encryptKey).toString();
        return acc;
    }, {});
    return sshInfoEncrypt;
};
var decrypt = function (user, sshInfo) { return _decrypt(user, sshInfo, crypto_js_1.AES.decrypt); };
exports.decrypt = decrypt;
var _decrypt = function (user, sshInfo, decryptFunc) {
    var decryptKey = user.Password;
    var sshInfoEncrypt = Object.entries(sshInfo).reduce(function (acc, _a) {
        var key = _a[0], val = _a[1];
        val = (val == null ? "undefined" : val).toString();
        if (key === "ID") {
            acc.ID = val;
            return acc;
        }
        try {
            acc[key] = decryptFunc(val, decryptKey).toString(crypto_js_1.enc.Utf8);
            return acc;
        }
        catch (error) {
            return acc;
        }
        acc[key] = decryptFunc(val, decryptKey).toString(crypto_js_1.enc.Utf8);
        console.log(acc);
        return acc;
    }, {});
    return sshInfoEncrypt;
};
