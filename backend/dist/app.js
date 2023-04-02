"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
// Initialiser l'application Express
exports.app = (0, express_1.default)();
// Vos middlewares et routes Express ici
db_1.default.on("error", console.error.bind(console, "MongoDB connection error:"));
db_1.default.once("open", () => {
    exports.app.listen(5000, () => {
        console.log("Server listening on port 5000");
    });
});
