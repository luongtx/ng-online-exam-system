import { Question } from "./exam-unit/questions/question.model"

export class Exam {
  id: number
  title: string
  image: string
  duration: number
  question: Question[]

  constructor(id: number, title: string, image: string, duration: number, question: Question[]) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.duration = duration;
    this.question = question
  }
}
