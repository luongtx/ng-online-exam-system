import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ExamService } from '../../exam.service';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions?: Question[]
  questionsCopy?: Question[];
  constructor(private activatedRpoute: ActivatedRoute, private examService: ExamService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.activatedRpoute.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        const exam = this.examService.getById(id)
        this.questions = exam.questions;
        this.questionsCopy = this.questions.slice();
      }
    )
  }

  onChangeFilterOption(option: any) {
    switch (option.value) {
      case "1":
        this.questions = this.questionsCopy;
        break;
      case "2":
        this.questions = this.questionsCopy?.filter(
          question => !this.questionService.userAnsForQuestion.get(question.id) ||
            this.questionService.userAnsForQuestion.get(question.id)?.length == 0
        );
        break;
      case "3":
        this.questions = this.questionsCopy?.filter(
          question => this.questionService.questionsMarkedForReview.get(question.id)
        );
        break;
      default:
        break;
    }
  }
}
