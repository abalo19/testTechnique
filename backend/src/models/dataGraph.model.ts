import * as mongoose from "mongoose";

import { Model } from "mongoose";

type DataGraphType = DataGraphModel & mongoose.Document;

export interface DataGraphModel {
    timestamp:{
        [x: string]: any;
        type:Date,
        required: true
    };

    highestPriceOfTheDay:{
        type:Number,
        required: true
    };

    lowestPriceOfTheDay:{
        type:Number,
        required: true
    }

    type:{
        type:String,
        required: true
    }
}

const DataGraphSchema = new mongoose.Schema({
    timestamp:{
        type:Date,
        required:true
    },
    highestPriceOfTheDay:{
        type:Number,
        required:true
    },
    lowestPriceOfTheDay:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
});

const DataGraph: Model<DataGraphType> = mongoose.model<DataGraphType>("DataGraph", DataGraphSchema);

export default DataGraph;