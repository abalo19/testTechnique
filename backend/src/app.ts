import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();


// Initialiser l'application Express
export const app: Application = express();



// Configurer les middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



import DataGraph from "./routes/dataGraph.route";

// Définir la route d'accueil
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Bienvenu sur Mon application de test." });
});

app.use(
    ( 
      err: Error, 
      req: Request, 
      res: Response, 
      next: NextFunction, 
      ) => {
      res.status(500).json({message: err.message});
    }
  );

  app.use("/DataGraph", DataGraph);


  
// Connexion à la base de données MongoDB
mongoose.connect("mongodb://localhost:27017/tddDabase")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));


