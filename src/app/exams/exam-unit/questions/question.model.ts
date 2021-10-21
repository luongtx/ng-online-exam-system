import { Answer } from "./answer.model";

export class Question {
  public id?: number
  public content?: string
  public answers: Answer[];
  // public multipleOptions?: boolean;
  public markedForReview?: boolean;

  constructor(id: number,content: string, answers: Answer[]) {
    this.id = id;
    this.content = content;
    this.answers = answers;
    // this.multipleOptions = isMultipleOptions;
    this.markedForReview = false;
  }
}
