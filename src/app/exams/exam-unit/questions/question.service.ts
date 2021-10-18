import { Injectable } from "@angular/core";
import { Answer } from "./answer.model";
import { Question } from "./question.model";

@Injectable({ providedIn: 'root' })
export class QuestionService {

  markForReview(question: Question, marked: boolean) {
    question.markedForReview = marked;
  }

  selectAnswer(answer: Answer, checked: boolean) {
    answer.checked = checked;
  }

}
