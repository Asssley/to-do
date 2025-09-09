import { Request, Response } from "express";
import { UserRepository } from "../../../repositories/userRepository";
import { IUser } from "../../../db/types/IUser";
import { TaskRepository } from "../../../repositories/taskRepository";
import { ObjectId } from "mongodb";

export const register = async function (req: Request, res: Response): Promise<void> {
  try {
    const { login, password } = req.body;

    const newUser: IUser = {
      login: login,
      password: password,
      taskList: [...(req.session.taskList ?? [])]
    };

    const newUserId = await UserRepository.addUser(newUser);

    req.session.taskList = [];
    req.session.userId = newUserId?.toString();

    res.status(200).send({ ok: true });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
    return;
  }
}

export const login = async function (req: Request, res: Response): Promise<void> {
  try {
    const { login, password } = req.body;
    
    const user = await UserRepository.getUserByLogin(login, password);
  
    if (user) {
      req.session.userId = user._id?.toString();
      if (req.session.taskList) {
        for (let task of req.session.taskList) {
          TaskRepository.addTask(user._id as ObjectId, task)
        }
      }
      res.status(200).send({ ok: true });
      return;
    }

    res.status(401).send({ error: "Incorect login or password" });
    return;
  } catch (err) {
    console.log(err); 
    res.status(500).send({ error: "Internal server error" });
    return;
  }
}

export const logout = async function (req: Request, res: Response): Promise<void> {
  if (!req.session) {
    res.clearCookie("connect.sid");
    res.status(404).send({ error: "Session not found" });
    return;
  }

  req.session.destroy(err => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.clearCookie("connect.sid");
    res.status(200).send({ ok: true });
    return;  
  });
}