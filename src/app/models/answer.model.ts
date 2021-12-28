export class Answer {
  public id?: number
  public content?: string
  public correct?: boolean
  public checked?: boolean

  constructor(id: number, content: string, correct: boolean) {
    this.id = id;
    this.content = content;
    this.correct = correct;
    this.checked = false
  }
}
