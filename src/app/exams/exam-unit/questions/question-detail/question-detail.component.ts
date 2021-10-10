import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Answer } from '../answer.model';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  @Input() question!: Question
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  convertToChar(num: number) {
    return String.fromCharCode(64+num);
  }

  markForReview: boolean = false;
  onClickReviewMarker() {
    this.markForReview = !this.markForReview
    this.questionService.markForReview(this.question.id, this.markForReview);
  }

  onCheckEvent(answer: Answer, event: any) {
    this.questionService.selectAnswer(answer, event.target.checked)
  }

}
