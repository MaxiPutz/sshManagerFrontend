"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionFlowSave = void 0;
const serverAdress_1 = require("../serverAdress");
const actionFlowSave = (user, sshInfos, commands, actionName) => __awaiter(void 0, void 0, void 0, function* () {
    const url = serverAdress_1.getUrl + "/ssh/actionFlow/create";
    const merge = Object.assign(Object.assign({ sshInfos }, user), { commands, ActionName: actionName });
    console.log(merge);
    try {
        return fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
            },
            body: JSON.stringify(merge)
        });
    }
    catch (error) {
        console.log("this is a issue");
        throw new Error("Failed to connect");
    }
});
exports.actionFlowSave = actionFlowSave;
