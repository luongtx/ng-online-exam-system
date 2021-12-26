import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';

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

  markForReview: boolean = false;
  onClickReviewMarker() {
    this.markForReview = !this.markForReview
    this.question.markedForReview = this.markForReview;
  }

  onCheckEvent(answer: Answer, event: any) {
    answer.checked = event.target.checked;
  }

}
