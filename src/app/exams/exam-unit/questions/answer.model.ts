export class Answer {
  public id: number
  public questionId: number
  public content: string
  public isCorrect: boolean
  public checked: boolean

  constructor(id: number, questionId: number, content: string, isCorrect: boolean) {
    this.id = id;
    this.questionId = questionId;
    this.content = content;
    this.isCorrect = isCorrect;
    this.checked = false
  }
}
