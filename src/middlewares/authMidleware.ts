import { Request, Response, NextFunction } from "express";
import { users } from "../controllers/api/v1/tasksController";

// Authenticate user. If session id is setted add user to request object   
export const authenticateUser = function (req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    const user = users.find(user => user.userId === req.session.userId)
    if (user) {
      req.user = user;
    } else {
      req.session.userId = undefined;
    }
  }

  next();
}