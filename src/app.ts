import { Express } from "express";
import env from "dotenv";
import { buildApp } from "./buildApp";
import { configDB } from "./db/configDB";

env.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "";

let app: Express = buildApp();

try {
  configDB(MONGO_URL);
  console.log("Succesfuly connected to DB")
  app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server listening port ${PORT}`));
} catch (error) {
  console.log(error);
}
