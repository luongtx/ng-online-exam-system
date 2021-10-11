import { Question } from "./exam-unit/questions/question.model"

export class Exam {
  id: number
  title: string
  description: string
  bannerImage: string
  duration: number
  passingScore: number
  questions: Question[]
  numberOfQuestions?: number

  constructor(id: number, title: string, description: string, image: string, duration: number, passingScore: number, questions: Question[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.bannerImage = image;
    this.duration = duration;
    this.passingScore = passingScore
    this.questions = questions
  }
}
