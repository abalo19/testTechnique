"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// import db from "./config/db";
const port = 5000;
app_1.app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
