import express, {Express} from "express";
import { taskRouter as taskRouterV1 } from "./routers/taskRouterV1";
import cors from "cors";

let PORT = 3000;

let app: Express = express();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use(taskRouterV1);

app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server listening port ${PORT}`));