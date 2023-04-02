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
exports.getAllDataTable = exports.getDetailsAchatVente = exports.getAllDataGraphs = exports.createDataGraph = void 0;
const dataGraph_model_1 = __importDefault(require("../models/dataGraph.model"));
const monthlyAverages = (dataArray, type) => {
    const filteredArray = dataArray.filter((item) => item.type.toString() === type);
    const monthlyData = filteredArray.reduce((acc, item) => {
        const date = item.timestamp;
        const month = date.toISOString().substr(0, 7);
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push((item.highestPriceOfTheDay + item.lowestPriceOfTheDay) / 2);
        return acc;
    }, {});
    return Object.entries(monthlyData).map(([month, prices]) => ({
        month,
        averagePrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
    }));
};
const createDataGraph = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    var datagraphs = yield dataGraph_model_1.default.create(data);
    return res
        .status(200)
        .json({ message: "DataGraph créé avec succès", data: datagraphs });
});
exports.createDataGraph = createDataGraph;
const getAllDataGraphs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datagraphs = yield dataGraph_model_1.default.find();
        // Créer deux tableaux séparés pour les types "Google" et "Amazon"
        const googleArray = datagraphs
            .filter((item) => item.type.toString() === "Google")
            .map((item) => item.toObject()); // <-- conversion de type
        const amazonArray = datagraphs
            .filter((item) => item.type.toString() === "Amazon")
            .map((item) => item.toObject()); // <-- conversion de type
        const googleMonthlyAverages = monthlyAverages(googleArray, "Google");
        const googleAveragePrices = googleMonthlyAverages.map((average) => Number(average.averagePrice.toFixed(2)));
        const amazonMonthlyAverages = monthlyAverages(amazonArray, "Amazon");
        const amazonAveragePrices = amazonMonthlyAverages.map((average) => Number(average.averagePrice.toFixed(2)));
        // recuperer le plus 
        // let maxObject = googleMonthlyAverages[0];
        // for (let i = 1; i < googleMonthlyAverages.length; i++) {
        //     if (googleMonthlyAverages[i].averagePrice > maxObject.averagePrice) {
        //         maxObject = googleMonthlyAverages[i];
        //     }
        // }
        return res
            .status(200)
            .json({ message: "Liste de tous les DataGraphs", evolution: { googleAveragePrices, amazonAveragePrices } });
    }
    catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des DataGraphs", error });
    }
});
exports.getAllDataGraphs = getAllDataGraphs;
const getDetailsAchatVente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datagraphs = yield dataGraph_model_1.default.find();
        // recuperer le plus 
        // let maxObject = googleMonthlyAverages[0];
        // for (let i = 1; i < googleMonthlyAverages.length; i++) {
        //     if (googleMonthlyAverages[i].averagePrice > maxObject.averagePrice) {
        //         maxObject = googleMonthlyAverages[i];
        //     }
        // }
        // Filtrer les éléments ayant le type "Google"
        const filteredDataG = datagraphs.filter((element) => element.type.toString() === "Google");
        // Filtrer les éléments ayant le type "Amazon"
        const filteredDataA = datagraphs.filter((element) => element.type.toString() === "Amazon");
        // Trouver l'élément qui a le moins de lowestPriceOfTheDay
        const minPriceAmazon = filteredDataA.reduce((prev, current) => {
            return prev.lowestPriceOfTheDay < current.lowestPriceOfTheDay ? prev : current;
        });
        // Trouver l'élément qui a le plus de highestPriceOfTheDay
        const maxPriceAmazon = filteredDataA.reduce((prev, current) => {
            return prev.highestPriceOfTheDay > current.highestPriceOfTheDay ? prev : current;
        });
        // Trouver l'élément qui a le moins de lowestPriceOfTheDay
        const minPriceGoogle = filteredDataG.reduce((prev, current) => {
            return prev.lowestPriceOfTheDay < current.lowestPriceOfTheDay ? prev : current;
        });
        // Trouver l'élément qui a le plus de highestPriceOfTheDay
        const maxPriceGoogle = filteredDataG.reduce((prev, current) => {
            return prev.highestPriceOfTheDay > current.highestPriceOfTheDay ? prev : current;
        });
        return res
            .status(200)
            .json({
            minPriceAmazon: minPriceAmazon,
            maxPriceAmazon: maxPriceAmazon,
            minPriceGoogle: minPriceGoogle,
            maxPriceGoogle: maxPriceGoogle
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des DataGraphs", error });
    }
});
exports.getDetailsAchatVente = getDetailsAchatVente;
const getAllDataTable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datagraphs = yield dataGraph_model_1.default.find();
        const updatedDatagraphs = datagraphs.flatMap((datagraph) => [
            Object.assign(Object.assign({}, datagraph.toObject()), { action: "achat" }),
            Object.assign(Object.assign({}, datagraph.toObject()), { action: "vente" }),
        ]);
        // const array1 = JSON.parse(JSON.stringify(updatedDatagraphs));
        return res
            .status(200)
            .json({
            updatedDatagraphs: updatedDatagraphs
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des DataGraphs", error });
    }
});
exports.getAllDataTable = getAllDataTable;
