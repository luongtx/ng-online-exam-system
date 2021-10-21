import { Component, Input, OnInit } from '@angular/core';
import { Answer } from '../answer.model';
import { Question } from '../question.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  @Input() question!: Question
  @Input() index!: number;
  constructor() { }

  ngOnInit(): void {
  }

  convertToChar(num: number) {
    return String.fromCharCode(64 + num);
  }

  markForReview: boolean = false;
  onClickReviewMarker() {
    this.markForReview = !this.markForReview
    this.question.markedForReview = this.markForReview;
  }

  onCheckEvent(answer: Answer, event: any) {
    answer.checked = event.target.checked;
  }

}
