import { Router } from "express";

import { createDataGraph, getAllDataGraphs, getDetailsAchatVente, getAllDataTable } from "../controllers/dataGraph.controller";

const router = Router();

router.post("/", createDataGraph);

router.get("/FindAll", getAllDataGraphs);

router.get("/FindAllAV", getDetailsAchatVente);

router.get("/FindAllTable", getAllDataTable);

router.put("/:id");

router.delete("/:id");

export default router;