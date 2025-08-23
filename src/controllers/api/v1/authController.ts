import { Request, Response } from "express";
import { User } from "../../../models/User";
import { users } from "./tasksController";

export const register = function (req: Request, res: Response): void {
  try {
    const { login, password } = req.body;
    const newUser = new User(login, password);

    newUser.taskList = [...(req.session.taskList ?? [])];
    req.session.taskList = [];
    req.session.userId = newUser.userId;
    users.push(newUser);

    res.status(200).send({ ok: true });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
    return;
  }
}

export const login = function (req: Request, res: Response): void {
  try {
    const { login, password } = req.body;
    const user = users.find(user => {
      return user.login === login
        && user.password === password;
    });
  
    if (user) {
      req.session.userId = user.userId;
      user.taskList = [...user.taskList, ...(req.session.taskList ?? [])];
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

export const logout = function (req: Request, res: Response): void {
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