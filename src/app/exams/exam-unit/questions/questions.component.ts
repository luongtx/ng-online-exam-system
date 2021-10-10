import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute, private examService: ExamService,
    private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        const exam = this.examService.getById(id)
        this.questions = exam.questions;
        this.questionsCopy = this.questions.slice();
      }
    )
  }

  onChangeFilterOption(value: string) {
    switch (value) {
      case "1":
        //all questions
        this.questions = this.questionsCopy;
        break;
      case "2":
        //fitler unanswered questions
        this.questions = this.filterUnAnsweredQuestion();
        break;
      case "3":
        //filter marked for review question
        this.questions = this.questionsCopy?.filter(
          question => question.isMarkedForReview
        );
        break;
      default:
        break;
    }
  }

  filterUnAnsweredQuestion(): Question[] {
    const questions = this.questionsCopy?.filter(
      question => {
        const answersChecked = question.answers.filter(ans => ans.checked)
        return !answersChecked || !answersChecked.length;
      }
    );
    return questions ? questions : [];
  }

  onSubmit() {
    if (this.filterUnAnsweredQuestion().length) {
      if (confirm("Are you sure to submit, there are some questions not answered yet?")) {
        this.router.navigate(['..', 'review'], {relativeTo: this.activatedRoute})
      };
      return;
    }
    this.router.navigate(['..', 'review'], {relativeTo: this.activatedRoute})
  }
}
