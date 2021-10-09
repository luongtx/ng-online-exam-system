import { Injectable } from "@angular/core";
import { Answer } from "./exam-unit/questions/answer.model";
import { Question } from "./exam-unit/questions/question.model";
import { Exam } from "./exam.model";

@Injectable({ providedIn: 'root' })
export class ExamService {
  private exams: Exam[] = [
    new Exam(1, "OCAJP8", "Oracle Java Certificate Associate 8", "https://miro.medium.com/max/352/1*L8DJfg003QUh02WiAQLc7g.png", 20, [
      new Question(1, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)])
    ]),
    new Exam(2, "OCPJP8", "Oracle Java Certificate Professional 8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBORrJDrMqEgkBc9OuhgX2a5qvwFm8Oxffj20HLl4cU2Qsgwe9U60L1lL0BqmNe6fiyo&usqp=CAU", 20, [
      new Question(2, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)])
    ]),
    new Exam(2, "OCPJP8", "Oracle Java Certificate Professional 8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBORrJDrMqEgkBc9OuhgX2a5qvwFm8Oxffj20HLl4cU2Qsgwe9U60L1lL0BqmNe6fiyo&usqp=CAU", 20, [
      new Question(2, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)])
    ]),
    new Exam(1, "OCAJP8", "Oracle Java Certificate Associate 8", "https://miro.medium.com/max/352/1*L8DJfg003QUh02WiAQLc7g.png", 20, [
      new Question(1, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)])
    ]),
    new Exam(2, "OCPJP8", "Oracle Java Certificate Professional 8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBORrJDrMqEgkBc9OuhgX2a5qvwFm8Oxffj20HLl4cU2Qsgwe9U60L1lL0BqmNe6fiyo&usqp=CAU", 20, [
      new Question(2, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)])
    ]),
    new Exam(2, "OCPJP8", "Oracle Java Certificate Professional 8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBORrJDrMqEgkBc9OuhgX2a5qvwFm8Oxffj20HLl4cU2Qsgwe9U60L1lL0BqmNe6fiyo&usqp=CAU", 20, [
      new Question(2, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)])
    ]),
  ]

  getExams() {
    return this.exams.slice()
  }
}
