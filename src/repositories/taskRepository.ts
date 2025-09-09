import { ObjectId } from "mongodb";
import { ITask } from "../db/types/ITask";
import { userColection } from "../db/configDB";
import { htmlEscape } from "../utils/helpers";

export class TaskRepository {
  static async addTask(userId: ObjectId, newTask: ITask): Promise<ObjectId | null> {
    if (!newTask._id) {
      newTask._id = new ObjectId();
    }

    newTask.text = htmlEscape(newTask.text);

    const filter = {
      _id: userId
    };
    const update = {
      $push: { taskList: newTask }
    };

    try {
      const result = await userColection.updateOne(filter, update);
      return result.upsertedId;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getTask(userId: ObjectId, taskId: ObjectId): Promise<ITask | null> {
    const filter = {
      _id: userId
    };

    const result = await userColection.findOne(filter);
    return result?.taskList.find(task => task._id?.equals(taskId)) ?? null;
  }

  static async getAllTasks(userId: ObjectId): Promise<ITask[]> {
    const filter = {
      _id: userId,
    };

    const result = await userColection.findOne(filter);

    return result?.taskList ?? [];
  }

  static async editTask(UserId: ObjectId, editedTask: ITask): Promise<boolean> {
    const filter = {
      _id: UserId,
      "taskList._id": editedTask._id
    };
    const update = {
      $set: {
        "taskList.$.text": htmlEscape(editedTask.text),
        "taskList.$.checked": editedTask.checked
      }
    };
    console.log(editedTask)

    const result = await userColection.updateOne(filter, update);
    return result.modifiedCount > 0;
  }

  static async deleteTask(userId: ObjectId, taskId: ObjectId): Promise<boolean> {
    const filter = {
      _id: userId,
    };
    const toDelete = {
      $pull: { taskList: { _id: taskId } }
    };

    const result = await userColection.updateOne(filter, toDelete);
    return result.modifiedCount > 0;
  }
}