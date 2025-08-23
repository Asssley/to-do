import express, { Express } from "express";
import { taskRouter as taskRouterV1 } from "./routers/taskRouterV1";
import cors from "cors";
import session from "express-session";
import FileStoreFactory from "session-file-store";
import { authRouterV1 } from "./routers/authRouterV1";
import { authenticateUser } from "./middlewares/authMidleware";

let PORT = 3000;

let app: Express = express();

const FileStore = FileStoreFactory(session);

app.use(
  session({
    store: new FileStore({ path: "./sessions" }),
    secret: "DVKn8ksv2al654MNKSlvmsLS23KvmDsl324sCMSLK",
    resave: false,
    saveUninitialized: true
  })
);

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(express.json());

app.get("/api/v1/status", (req, res) => {
  res.sendStatus(200);
});

app.use(authRouterV1);

app.use(authenticateUser);

app.use(taskRouterV1);

app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server listening port ${PORT}`));