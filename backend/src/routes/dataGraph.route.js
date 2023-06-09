"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataGraph_controller_1 = require("../controllers/dataGraph.controller");
const router = (0, express_1.Router)();
router.post("/", dataGraph_controller_1.createDataGraph);
router.get("/FindAll", dataGraph_controller_1.getAllDataGraphs);
router.get("/FindAllAV", dataGraph_controller_1.getDetailsAchatVente);
router.get("/FindAllTable", dataGraph_controller_1.getAllDataTable);
router.put("/:id");
router.delete("/:id");
exports.default = router;
