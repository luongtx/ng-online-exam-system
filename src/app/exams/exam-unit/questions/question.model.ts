import { Answer } from "./answer.model";

export class Question {
  public id: number
  public content: string
  public answers: Answer[];
  public isMultipleOptions: boolean;

  constructor(id: number,content: string, answers: Answer[], isMultipleOptions: boolean) {
    this.id = id;
    this.content = content;
    this.answers = answers;
    this.isMultipleOptions = isMultipleOptions
  }
}
