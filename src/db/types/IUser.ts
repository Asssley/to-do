import { ObjectId } from "mongodb";
import { ITask } from "./ITask";

export interface IUser {
  _id?: ObjectId;
  taskList: ITask[];
  login: string,
  password:string   
}