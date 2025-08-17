import { generateId } from "../utils/generateId";

export class Task {
  public id: string;
  public text: string;
  public checked: boolean = false;

  constructor(text: string) {
    this.text = text;
    this.id = generateId();
  }

}

