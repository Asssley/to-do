import { ObjectId } from "mongodb";
import { IUser } from "../db/types/IUser";
import { userColection } from "../db/configDB";

export class UserRepository {
  static async addUser(newUser: IUser): Promise<ObjectId | null> {
    try {
      const result = await userColection.insertOne(newUser);
      return result.insertedId;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getUser(id: ObjectId): Promise<IUser | null> {
    const filter = {
      _id: id
    };
    return await userColection.findOne(filter);
  }

  static async getUserByLogin(login: string, password: string): Promise<IUser | null> {
    const filter = {
      login: login,
      password: password
    };
    return await userColection.findOne(filter);
  }

  static async getAllUsers(): Promise<IUser[]> {
    return await userColection.find().toArray();
  }

  static async deleteUser(id: ObjectId): Promise<boolean> {
    const filter = {
      _id: id
    };
    const result = await userColection.deleteOne(filter);
    return result.acknowledged
  }
}