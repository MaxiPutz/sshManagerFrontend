"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSSH = void 0;
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const sshSlice_1 = require("../../store/sshSlice/sshSlice");
function ListSSH() {
    const sshs = (0, react_redux_1.useSelector)(sshSlice_1.select.getSSH);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "SSH List")),
        react_1.default.createElement("div", null, SSHTable(sshs))));
}
exports.ListSSH = ListSSH;
const SSHTable = (elements) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "rowNumber"),
                    react_1.default.createElement("th", null, "IP Address"),
                    react_1.default.createElement("th", null, "User"),
                    react_1.default.createElement("th", null, "Password"),
                    react_1.default.createElement("th", null, "Key"),
                    react_1.default.createElement("th", null, "actions"))),
            react_1.default.createElement("tbody", null, elements.map((ele, i) => {
                return (react_1.default.createElement("tr", { key: i },
                    react_1.default.createElement("td", null, i),
                    react_1.default.createElement("td", null, ele.IPAddress),
                    react_1.default.createElement("td", null, ele.User),
                    react_1.default.createElement("td", null, "*********"),
                    react_1.default.createElement("td", null, "*********" || ''),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("button", null, " exe "),
                        react_1.default.createElement("button", null, " scp "))));
            })))));
};
