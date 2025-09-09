import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { TaskRepository } from "../../../repositories/taskRepository";
import { ITask } from "../../../db/types/ITask";

export const getItems = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId

  if (userId) {
    const tasks = await TaskRepository.getAllTasks(new ObjectId(userId));
    res.json({ items: tasks });
    return;
  }

  res.json({ items: req.session.taskList || [] });
  return;
}

export const addItem = async (req: Request, res: Response): Promise<void> => {
  let userId = req.session.userId;

  const newTask: ITask = {
    text: req.body.text,
    checked: false,
    _id: new ObjectId()
  };

  try {
    if (userId) {
      await TaskRepository.addTask(new ObjectId(userId), newTask);
    } else {
      if (!req.session.taskList) {
        req.session.taskList = [];
      }
      req.session.taskList.push(newTask);
    }

    res.status(201).send({ _id: newTask._id });
    return;
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Bad request" });
    return;
  }
}

export const editItem = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId;

  try {
    const { _id, text, checked } = req.body;

    let task: ITask | null;

    if (userId) {
      task = await TaskRepository.getTask(new ObjectId(userId), new ObjectId(_id as string));
    } else {
      if (!req.session.taskList) req.session.taskList = [];
      task = req.session.taskList.find((item) => item._id == new ObjectId(_id as string));
    }

    if (task) {
      if (text) task.text = text;
      if (checked !== undefined) task.checked = checked;

      if (userId) {
        await TaskRepository.editTask(new ObjectId(userId), task)
      } 
      res.status(200).send({ ok: true });
      return;
    }
    else {
      res.status(404).send({ error: "Not found" });
      return;
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: "Internal server error" });
    return;
  }
}

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId;
  const taskId: ObjectId = new ObjectId(req.body._id as string);

  if (userId) {
    let result = await TaskRepository.deleteTask(new ObjectId(userId), taskId);
    if (result) {
      res.status(200).send({ ok: true });
      return;
    } else {
      res.status(404).send({ error: "Not found" });
      return;
    }

  } else {
    let index = req.session.taskList.findIndex((item) => item._id == taskId);

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