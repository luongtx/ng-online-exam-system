import { Answer } from "./answer.model";

export class Question {
  public id: number
  public title: string
  public answers: Answer[];

  constructor(id: number,title: string, answers: Answer[]) {
    this.id = id;
    this.title = title;
    this.answers = answers;
  }
}
