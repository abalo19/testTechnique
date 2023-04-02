"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = __importDefault(require("./config/db"));
db_1.default.on("error", console.error.bind(console, "MongoDB connection error:"));
db_1.default.once("open", () => {
    app_1.app.listen(5000, () => {
        console.log("Server listening on port 5000");
    });
});
