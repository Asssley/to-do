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

export const getItems = (req: Request, res: Response) => {
  if (req.user) {
    res.json(req.user.taskList);
  }

  res.json(req.session.taskList);
}

export const addItem = (req: Request, res: Response) => {
  try {
    const newTask: Task = new Task(req.body.text);

    if (req.user) {
      req.user.taskList.push(newTask);
    } else {
      req.session.taskList.push(newTask);
    }

    res.json({ id: newTask.id });
  } catch (err) {
    res.status(400).json({ msg: "Bad request" });
  }
}

export const editItem = (req: Request, res: Response) => {
  try {
    const reqTask = req.body;
    let task: Task | undefined;

    if (req.user) {
      task = req.user.taskList.find((item) => item.id === reqTask.id);
    } else {
      task = req.session.taskList.find((item) => item.id === reqTask.id);
    }

    if (task) {
      if (reqTask.text) task.text = reqTask.text;
      if (reqTask.checked) task.checked = reqTask.checked;
      res.json({ msg: "Success" });
    }
    else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Bad request" });
  }
}

export const deleteItem = (req: Request, res: Response) => {
  const id: string = req.body.id;

  let index: number;

  if (req.user) {
    index = req.user.taskList.findIndex((item) => item.id === id);

    if (index >= 0) {
      req.user.taskList.splice(index, 1);
      res.json({ msg: "Success" });
    };
  } else {
    index = req.session.taskList.findIndex((item) => item.id === id);

    if (index >= 0) {
      req.session.taskList.splice(index, 1);
      res.json({ msg: "Success" });
    }
  }
  res.status(404).json({ msg: "Not found" });
}