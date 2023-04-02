import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/tddDabase")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));

export default mongoose.connection;
