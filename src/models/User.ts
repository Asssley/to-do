import { Task } from "./Task";
import { generateId } from "../utils/generateId";

export class User {
  public userId: string;
  public taskList: Task[];

  constructor(public login: string, public password: string) {
    this.userId = generateId();
    this.taskList = [];
  }
}