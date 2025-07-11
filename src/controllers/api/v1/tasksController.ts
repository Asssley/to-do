import { Router, Request, Response } from "express";
import { Task } from "../../../models/Task";

const items: Task[] = [];

export const getItems = (req: Request, res: Response) => {
  res.json({ items });
}

export const addItem = (req: Request, res: Response) => {
  try {
    let newItem: Task = new Task(req.body.text);
  
    items.push(newItem);
    res.json({
      id: items[items.length - 1].id
    });
  } catch (err) {
    res.status(400).json({
      "error": "Invalid object"
    })
  }
}

export const editItem = (req: Request, res: Response) => {
  let reqTask = req.body;
  let task = items.find((item) => item.id === reqTask.id);

  if (task) {
    if (reqTask.text) task.text = reqTask.text;
    if (reqTask.checked) task.checked = reqTask.checked;
    res.json({
      "ok": true
    });
  }
  else {
    res.status(400).json({
      "error": "Bad request"
    });
  }
}

export const deleteItem = (req: Request, res: Response) => {
  let id: number = req.body.id;
  
  if (id === undefined) {
    res.status(400).json({
      "error": "Bad request"
    });
  }

  let index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    items.splice(index, 1);
    res.json({
      "ok": true
    });
  } else {
    res.json({
      "ok": false
    });
  }
}