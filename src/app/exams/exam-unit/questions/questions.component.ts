import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exam } from '../../shared/exam.model';
import { ExamService } from '../../shared/exam.service';
import { Question } from './question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  exam!: Exam;
  questions?: Question[] = [];
  timer: { min: number, sec: number } = { min: 0, sec: 0 };
  timerSubscription?: Subscription
  timeOutSubcription?: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private examService: ExamService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.examService.getById(id).subscribe(
          (exam) => {
            this.exam = exam;
            this.examService.getQuestionsByExamId(id).subscribe(
              (questions) => {
                this.exam.questions = questions
                this.questions = this.exam.questions;
              }
            )
            this.examService.startTimerForExam(this.exam.duration);
          }
        )
        this.timerSubscription = this.examService.timer?.subscribe(
          (nextTime) => this.timer = nextTime
        )
        this.timeOutSubcription = this.examService.timeOut?.subscribe(
          () => {
            this.submitExam()
          }
        );
      }
    )
  }

  onChangeFilterOption(value: string) {
    switch (value) {
      case "1":
        //all questions
        this.questions = this.exam.questions;
        break;
      case "2":
        //fitler unanswered questions
        this.questions = this.examService.filterUnAnsweredQuestion(this.exam.questions)
        break;
      case "3":
        //filter marked for review question
        this.questions = this.examService.filterMarkForReviews(this.exam.questions);
        break;
      default:
        break;
    }
  }

  onSubmit() {
    if (this.examService.filterUnAnsweredQuestion(this.exam.questions).length) {
      if (confirm("Are you sure to submit, there are some questions not answered yet?")) {
        this.submitExam()
      };
      return;
    }
    this.submitExam()
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
    this.timeOutSubcription?.unsubscribe();
  }

  submitExam() {
    this.examService.submitExam(this.exam);
    this.router.navigate(['..', 'review'], { relativeTo: this.activatedRoute });
  }

  onExit() {
    if (confirm("Are you sure to exit, all progress will be lost")) {
      this.examService.exitExam(this.exam);
      this.router.navigate(['/exams'])
    };
  }
}
