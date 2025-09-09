import { Router, Request, Response } from "express";
import { login, logout, register } from "../controllers/api/v1/authController";
import { addItem, deleteItem, editItem, getItems } from "../controllers/api/v1/tasksController";

export const router: Router = Router();

router.get("/api/v2/router",
  (req: Request, res: Response) => {
    switch (req.query.action) {
      case "login":
        login(req, res);
        break;
      case "logout":
        logout(req, res);
        break;
      case "register":
        register(req, res);
        break;
      case "getItems":
        getItems(req, res);
        break;
      case "deleteItem":
        deleteItem(req, res);
        break;
      case "addItem":
        addItem(req, res);
        break;
      case "editItem":
        editItem(req, res);
        break;
    }
  });

router.get("/api/v2/status", (req, res) => {
  res.sendStatus(200);
});
