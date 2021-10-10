import { Injectable } from "@angular/core";
import { Question } from "./question.model";

@Injectable({ providedIn: 'root' })
export class QuestionService {

  // questionStatus: { [id: number]: { isAnswered: boolean, isMarked: boolean } } = new Map();
  questionsMarkedForReview = new Map();

  markForReview(id:number, status: boolean) {
    this.questionsMarkedForReview.set(id, status);
  }
}
