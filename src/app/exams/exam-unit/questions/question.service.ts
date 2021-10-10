import { Injectable } from "@angular/core";
import { Answer } from "./answer.model";
import { Question } from "./question.model";

@Injectable({ providedIn: 'root' })
export class QuestionService {

  // questionStatus: { [id: number]: { isAnswered: boolean, isMarked: boolean } } = new Map();
  questionsMarkedForReview = new Map();
  userAnsForQuestion = new Map();

  markForReview(id: number, status: boolean) {
    this.questionsMarkedForReview.set(id, status);
  }

  selectAnswer(answer: Answer, checked: boolean) {
    answer.checked = checked;
    let listAns: number[] = this.userAnsForQuestion.get(answer.questionId);
    if (checked) {
      if (!listAns) {
        listAns = [];
      }
      listAns.push(answer.id);
    } else {
      listAns = listAns?.filter(ans => ans != answer.id);
    }
    this.userAnsForQuestion.set(answer.questionId, listAns);
  }

}
