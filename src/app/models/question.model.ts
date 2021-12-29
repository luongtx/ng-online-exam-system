import { Answer } from "./answer.model";

export class Question {
  public id?: number
  public content?: string
  public answers: Answer[];
  public catalogId?: number
  public examId?: number
  // public multipleOptions?: boolean;
  public markedForReview?: boolean;

  constructor(id: number, content: string, answers: Answer[], catalogId: number, examId: number) {
    this.id = id;
    this.content = content;
    this.answers = answers;
    // this.multipleOptions = isMultipleOptions;
    this.markedForReview = false;
    this.catalogId = catalogId;
    this.examId = examId;
  }
}
