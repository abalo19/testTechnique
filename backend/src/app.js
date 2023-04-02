"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Charger les variables d'environnement
dotenv_1.default.config();
// Initialiser l'application Express
exports.app = (0, express_1.default)();
// Configurer les middlewares
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
const dataGraph_route_1 = __importDefault(require("./routes/dataGraph.route"));
// Définir la route d'accueil
exports.app.get("/", (req, res) => {
    res.send({ message: "Bienvenu sur Mon application de test." });
});
exports.app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
exports.app.use("/DataGraph", dataGraph_route_1.default);
// Connexion à la base de données MongoDB
mongoose_1.default.connect("mongodb://localhost:27017/tddDabase")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
