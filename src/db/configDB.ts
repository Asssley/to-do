import { Collection, MongoClient } from "mongodb";
import { IUser } from "./types/IUser";

export let userColection: Collection<IUser>; 

export function configDB(mongo_url: string): void {
  userColection = new MongoClient(mongo_url).db("to-do").collection("Users");
}