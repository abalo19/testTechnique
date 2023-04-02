import { app } from './app';
// import db from "./config/db";

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

