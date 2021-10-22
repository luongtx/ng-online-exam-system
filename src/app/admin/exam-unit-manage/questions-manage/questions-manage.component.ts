import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/exams/exam-unit/questions/question.model';
import { ExamService, GetResponseQuestions } from 'src/app/exams/shared/exam.service';
import { Page } from 'src/app/shared/page.model';

@Component({
  selector: 'app-questions-manage',
  templateUrl: './questions-manage.component.html',
  styleUrls: ['./questions-manage.component.css']
})
export class QuestionsManageComponent implements OnInit {
  questions?: Question[] = []
  editable: boolean = false
  questionCopy: Question = {
    content: "",
    answers: []
  }
  examId!: number;

  page: Page = {
    page: 0,
    size: 5
  }

  constructor(private examService: ExamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = +this.route.snapshot.params['id']
    this.loadQuestions()
  }

  onQuestionSaved(question: Question) {
    console.log(question);
    this.examService.saveQuestion(question, this.examId).subscribe(
      () => {
        this.loadQuestions()
        this.editable = false
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  loadQuestions() {
    this.examService.getQuestionsPaginated(this.examId, this.page.page, this.page.size)
      .subscribe(
        (data: GetResponseQuestions) => {
          // console.log(data);
          this.questions = data.questions
          this.page.totalItem = data.totalItems
          this.page.totalPages = data.totalPages;
          this.page.pages = [...Array(data.totalPages).keys()]
        }
      )
  }

  onEditClicked(question: Question) {
    // console.log(question.answers);
    this.editable = true
    this.questionCopy = { ...question }
  }

  onFormClosed() {
    this.editable = false
  }

  onAddClicked() {
    this.editable = true
    this.questionCopy = {
      answers: [{}]
    }
  }

  onDeleteClicked(question: Question) {
    if (confirm("Delete this question?")) {
      this.examService.deleteQuestion(question.id!).subscribe(
        () => {
          this.loadQuestions()
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }

  onEntriesPerPageChange(event: any) {
    this.page.size = +event.target.value;
    this.loadQuestions()
  }

  requestDataOnPage(pageNum: number) {
    this.examService.getQuestionsPaginated(this.examId, pageNum, this.page.size)
      .subscribe(
        (data: GetResponseQuestions) => {
          this.questions = data.questions
        }
      )
  }

  //Pagination
  onPreviousPage() {
    if (this.page.page > 0) {
      this.page.page--
      this.requestDataOnPage(this.page.page)
    }
  }

  onNextPage() {
    if (this.page.page < this.page.totalPages! - 1) {
      this.page.page++
      this.requestDataOnPage(this.page.page)
    }
  }

  onSpecifiedPage(pageIndex: number) {
    this.page.page = pageIndex;
    this.requestDataOnPage(this.page.page)
  }

}
