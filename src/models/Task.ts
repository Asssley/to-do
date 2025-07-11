export class Task {
  public id: number;
  public text: string;
  public checked: boolean = false;

  private static lastId: number = 0;

  constructor(text: string, checked?: boolean, id?: number) {
    this.text = text;
    if (checked !== undefined) {
      this.checked = checked;
    }
    if (id !== undefined) {
      this.id = id;
    }
    else {
      this.id = Task.lastId;
      Task.lastId++;
    }
  }

}
