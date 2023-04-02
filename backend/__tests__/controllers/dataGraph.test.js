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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer;
describe('UserController', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
        //   const mongoUri = await mongoServer.getUri();
        yield mongoose_1.default.connect("mongodb://localhost:27017/tddDabase");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    describe('GET /DataGraph/FindAll', () => {
        it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            // Utilisez Supertest pour tester l'API
            const response = yield (0, supertest_1.default)(app_1.app).get('/DataGraph/FindAll');
            // Vérifiez si la réponse est conforme à vos attentes
            expect(response.status).toBe(200);
            expect(response.body.evolution.googleAveragePrices).toBeInstanceOf(Array);
            expect(response.body.evolution.amazonAveragePrices).toBeInstanceOf(Array);
        }));
    });
    // Ajoutez d'autres tests pour les autres routes ou méthodes du controller
});
