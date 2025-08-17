import { Request, Response } from "express";
import { User } from "../../../models/User";
import { users } from "./tasksController";

export const register = function (req: Request, res: Response) {
  try {
    const { login, password } = req.body;
    const newUser = new User(login, password);

    newUser.taskList = req.session.taskList ?? [];
    req.session.taskList = [];
    req.user = newUser;

    res.status(302).redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const login = function (req: Request, res: Response) {
  try {
    const { login, password } = req.body;
    const user = users.find(user => {
      return user.login === login
        && user.password === password;
    });

    if (user) {
      req.session.userId = user.userId;
      user.taskList.concat(req.session.taskList ?? []);
      res.status(302).redirect("/");
    }

    res.status(401).json({ msg: "Incorect login or password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const logout = function (req: Request, res: Response) {
  req.session.destroy(err => {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  });
  res.status(200).json({ msg: "Success" });
}