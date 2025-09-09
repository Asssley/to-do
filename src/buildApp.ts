import express, { Express } from "express";
import cors from "cors";
import session from "express-session";
import FileStoreFactory from "session-file-store";
import { taskRouter as taskRouterV1 } from "./routers/taskRouterV1";
import { authRouterV1 } from "./routers/authRouterV1";
import { router as mainRouterV2 } from "./routers/mainRouterV2";

export function buildApp(): Express {
  const app: Express = express()
  const FileStore = FileStoreFactory(session);
  const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split("") || [];

  app.use(
    session({
      store: new FileStore({ path: "./sessions" }),
      secret: process.env.SESSION_KEY ?? "DjcnjkscnDKJ938nfcmdq",
      resave: false,
      saveUninitialized: true
    })
  );
  
  app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true
  }));
  
  app.use(express.json());
    
  app.use(authRouterV1);
  app.use(taskRouterV1);
  app.use(mainRouterV2);
  
  return app;
}
