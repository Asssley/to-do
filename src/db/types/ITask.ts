import { ObjectId } from "mongodb";

export interface ITask {
  _id?: ObjectId;
  text: string;
  checked: boolean;
}