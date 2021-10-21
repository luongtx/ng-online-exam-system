import { Question } from "../exam-unit/questions/question.model"

export class Exam {
  constructor(
    public id?: number,
    public examCode?: string,
    public title?: string,
    public description?: string,
    public bannerImageSource?: string,
    public duration?: number,
    public passingScore?: number,
    public questions?: Question[],
    public numberOfQuestions?: number,
  ) { }
}
