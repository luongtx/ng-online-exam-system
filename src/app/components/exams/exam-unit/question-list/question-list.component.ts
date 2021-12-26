import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanDeactivateComponent } from 'src/app/guards/can-deactivate-guard.service';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy, CanDeactivateComponent {
  exam!: Exam;
  questions?: Question[] = [];
  filteredQuestions?: Question[];
  timer: { min: number, sec: number } = { min: 0, sec: 0 };
  timerSubscription?: Subscription
  timeOutSubcription?: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private examService: ExamService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("onInit");
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.examService.getById(id).subscribe(
          (exam) => {
            this.exam = exam;
            this.examService.getQuestionsPaginated(id).subscribe(
              (data) => {
                this.exam.questions = data.data;
                this.questions = this.exam.questions;
                this.filteredQuestions = this.questions;
                this.page.totalPages = Math.ceil(this.questions.length / this.page.size);
                this.fetchPageData();
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

  onChangeFilterOption(event: Event) {
    let value = (<HTMLSelectElement>event.target).value;
    switch (value) {
      case "1":
        //all question-list
        this.filteredQuestions = this.exam.questions;
        this.updatePageAfterFilterApplied();
        break;
      case "2":
        //fitler unanswered question-list
        console.log("filter unanswered question-list");
        this.filteredQuestions = this.examService.filterUnAnsweredQuestion(this.exam.questions)
        this.updatePageAfterFilterApplied();
        break;
      case "3":
        //filter marked for review question
        this.filteredQuestions = this.examService.filterMarkForReviews(this.exam.questions);
        this.updatePageAfterFilterApplied();
        break;
      default:
        break;
    }
  }

  onSubmit() {
    if (this.examService.filterUnAnsweredQuestion(this.exam.questions).length) {
      if (confirm("Are you sure to submit, there are some question-list not answered yet?")) {
        this.submitExam()
      };
      return;
    }
    this.submitExam()
  }

  onExit() {
    history.back();
  }

  ngOnDestroy(): void {
    console.log("On destroy");
    this.timerSubscription?.unsubscribe();
    this.timeOutSubcription?.unsubscribe();
  }

  isSubmitted: boolean = false;
  submitExam() {
    this.examService.submitExam(this.exam);
    this.isSubmitted = true;
    this.router.navigate(['..', 'review'], { relativeTo: this.activatedRoute });
  }

  //pagination
  page = {
    page: 0,
    size: 3,
    totalPages: 0
  }

  fetchPageData() {
    let startIndex = this.page.page * this.page.size;
    let tailIndex = startIndex + this.page.size;
    this.questions = this.filteredQuestions?.slice(startIndex, tailIndex);
  }

  previousPage() {
    if (this.page.page > 0) {
      this.page.page--;
      this.fetchPageData();
    }
  }

  nextPage() {
    if (this.page.page < this.page.totalPages - 1) {
      this.page.page++;
      this.fetchPageData();
    }
  }

  updatePageAfterFilterApplied() {
    this.page.page = 0;
    this.page.totalPages = Math.ceil(this.filteredQuestions!.length / this.page.size);
    this.fetchPageData();
  }
  //detect navigation changes
  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.isSubmitted) {
      if (confirm("Your progress will be lost if you leave, continue?")) {
        this.examService.exitExam(this.exam);
        return true;
      }
      return false;
    }
    return true;
  }
}
