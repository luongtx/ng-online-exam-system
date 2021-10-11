export class Answer {
  public id: number
  public content: string
  public isCorrect: boolean
  public checked: boolean

  constructor(id: number, content: string, isCorrect: boolean) {
    this.id = id;
    this.content = content;
    this.isCorrect = isCorrect;
    this.checked = false
  }
}
