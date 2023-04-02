import mongoose from "mongoose";

mongoose.connect("mongodb://0.0.0.0/tddDabase")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));

export default mongoose.connection;
