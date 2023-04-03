import { app } from './app';
import db from "./config/db";

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
});
