import { Request, Response } from "express";
import { User } from "../../../models/User";
import { Task } from "../../../models/Task";

export const users: User[] = [
  {
    userId: "1",
    login: "qwe",
    password: "123",
    taskList: [
      {
        id: "101",
        text: "do something finaly!",
        checked: false
      }
    ]
  }
];

export const getItems = (req: Request, res: Response): void => {
  if (req.user) {
    res.json({ items: req.user.taskList });
    return;
  }

  res.json({ items: req.session.taskList || []});
  return;
}

export const addItem = (req: Request, res: Response): void => {
  try {
    const newTask: Task = new Task(req.body.text);

    if (req.user) {
      req.user.taskList.push(newTask);
    } else {
      if (!req.session.taskList) req.session.taskList = [];
      req.session.taskList.push(newTask);
    }

    res.status(201).send({ id: newTask.id });
    return;
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Bad request" });
    return;
  }
}

export const editItem = (req: Request, res: Response): void => {
  try {
    const reqTask = req.body;
    let task: Task | undefined;

    if (req.user) {
      task = req.user.taskList.find((item) => item.id === reqTask.id);
    } else {
      if (!req.session.taskList) req.session.taskList = [];
      task = req.session.taskList.find((item) => item.id === reqTask.id);
    }

    if (task) {
      if (reqTask.hasOwnProperty("text")) task.text = reqTask.text;
      if (reqTask.hasOwnProperty("checked")) task.checked = reqTask.checked;
      res.status(200).send({ ok: true });
      return;
    }
    else {
      res.status(404).send({ error: "Not found" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
    return;
  }
}

export const deleteItem = (req: Request, res: Response): void => {
  const id: string = req.body.id;

  let index: number;

  if (req.user) {
    index = req.user.taskList.findIndex((item) => item.id === id);

    if (index >= 0) {
      req.user.taskList.splice(index, 1);
      res.status(200).send({ ok: true });
      return;
    } else {
      res.status(404).send({ error: "Not found" });
      return;
    }

  } else {
    if (!req.session.taskList) req.session.taskList = [];
    index = req.session.taskList.findIndex((item) => item.id === id);

    if (index >= 0) {
      req.session.taskList.splice(index, 1);
      res.status(200).send({ ok: true });
      return;
    } else {
      res.status(404).send({ error: "Not found" });
      return;
    }
  }
}