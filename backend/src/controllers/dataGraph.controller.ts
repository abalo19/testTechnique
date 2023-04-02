import { RequestHandler } from "express";

import dataGraph, { DataGraphModel } from '../models/dataGraph.model';

interface DataPoint {
  _id: string;
  timestamp: Date;
  highestPriceOfTheDay: number;
  lowestPriceOfTheDay: number;
  type: string;
  __v: number;
}


type MonthlyAverage = {
  month: string;
  averagePrice: number;
};

const monthlyAverages = (dataArray: DataPoint[], type: string): MonthlyAverage[] => {
  const filteredArray = dataArray.filter((item) => item.type.toString() === type);

  const monthlyData = filteredArray.reduce<{ [month: string]: number[] }>((acc, item) => {
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
    averagePrice: prices.reduce((sum: number, price: number) => sum + price, 0) / prices.length,
  }));
};




export const createDataGraph: RequestHandler = async (req, res, next) => {
    const data: DataGraphModel = req.body;

    var datagraphs = await dataGraph.create(data);

    return res
        .status(200)
        .json({message: "DataGraph créé avec succès", data: datagraphs});
}

export const getAllDataGraphs: RequestHandler = async (req, res, next) => {
  try {
    const datagraphs = await dataGraph.find();
    // Créer deux tableaux séparés pour les types "Google" et "Amazon"
    const googleArray = datagraphs
      .filter((item) => item.type.toString() === "Google")
      .map((item) => item.toObject() as DataPoint); // <-- conversion de type

    const amazonArray = datagraphs
      .filter((item) => item.type.toString() === "Amazon")
      .map((item) => item.toObject() as DataPoint); // <-- conversion de type

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
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des DataGraphs", error });
  }
}



export const getDetailsAchatVente: RequestHandler = async (req, res, next) => {
  try {
    const datagraphs = await dataGraph.find();
      // recuperer le plus 
      // let maxObject = googleMonthlyAverages[0];

      // for (let i = 1; i < googleMonthlyAverages.length; i++) {
      //     if (googleMonthlyAverages[i].averagePrice > maxObject.averagePrice) {
      //         maxObject = googleMonthlyAverages[i];
      //     }
      // }

      // Filtrer les éléments ayant le type "Google"
const filteredDataG = datagraphs.filter((element) => element.type.toString() === "Google")

// Filtrer les éléments ayant le type "Amazon"
const filteredDataA = datagraphs.filter((element) => element.type.toString() === "Amazon")

// Trouver l'élément qui a le moins de lowestPriceOfTheDay
const minPriceAmazon = filteredDataA.reduce((prev, current) => {
  return prev.lowestPriceOfTheDay < current.lowestPriceOfTheDay ? prev : current
})

// Trouver l'élément qui a le plus de highestPriceOfTheDay
const maxPriceAmazon = filteredDataA.reduce((prev, current) => {
  return prev.highestPriceOfTheDay > current.highestPriceOfTheDay ? prev : current
})


// Trouver l'élément qui a le moins de lowestPriceOfTheDay
const minPriceGoogle = filteredDataG.reduce((prev, current) => {
  return prev.lowestPriceOfTheDay < current.lowestPriceOfTheDay ? prev : current
})

// Trouver l'élément qui a le plus de highestPriceOfTheDay
const maxPriceGoogle = filteredDataG.reduce((prev, current) => {
  return prev.highestPriceOfTheDay > current.highestPriceOfTheDay ? prev : current
})



    return res
      .status(200)
      .json({
        minPriceAmazon: minPriceAmazon,
        maxPriceAmazon: maxPriceAmazon,
        minPriceGoogle: minPriceGoogle,
        maxPriceGoogle: maxPriceGoogle
      });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des DataGraphs", error });
  }
}






export const getAllDataTable: RequestHandler = async (req, res, next) => {
  try {
    const datagraphs = await dataGraph.find();

    const updatedDatagraphs = datagraphs.flatMap((datagraph) => [
      {
        ...datagraph.toObject(),
        action: "achat",
      },
      {
        ...datagraph.toObject(),
        action: "vente",
      },
    ]);

    
    // const array1 = JSON.parse(JSON.stringify(updatedDatagraphs));
    
    return res
      .status(200)
      .json({
        updatedDatagraphs: updatedDatagraphs
      });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des DataGraphs", error });
  }
}
