import { Router } from "express";
import { getItems, addItem, editItem, deleteItem } from "../controllers/api/v1/tasksController";

export const taskRouter: Router = Router();

taskRouter.get("/api/v1/status", (req, res) => {
  res.sendStatus(200);
});

taskRouter.get("/api/v1/items", getItems);

taskRouter.post("/api/v1/items", addItem);

taskRouter.put("/api/v1/items", editItem);

taskRouter.delete("/api/v1/items", deleteItem);
