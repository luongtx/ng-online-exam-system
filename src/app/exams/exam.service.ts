import { Injectable } from "@angular/core";
import { Answer } from "./exam-unit/questions/answer.model";
import { Question } from "./exam-unit/questions/question.model";
import { Exam } from "./exam.model";
import { ExamsComponent } from "./exams.component";

@Injectable({ providedIn: ExamsComponent })
export class ExamService {
  private exams: Exam[] = [
    new Exam(1, "Oracle Java Certificate Associate", "", 20, [
      new Question(1, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)])
    ]),
    new Exam(2, "Oracle Java Certificate Professional", "", 20, [
      new Question(2, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)])
    ])
  ]

  getExams() {
    return this.exams.slice()
  }
}
