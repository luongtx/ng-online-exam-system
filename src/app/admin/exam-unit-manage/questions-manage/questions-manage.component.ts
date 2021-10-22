import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/exams/exam-unit/questions/question.model';
import { ExamService, PageRequest, PageResponse } from 'src/app/exams/shared/exam.service';

@Component({
  selector: 'app-questions-manage',
  templateUrl: './questions-manage.component.html',
  styleUrls: ['./questions-manage.component.css']
})
export class QuestionsManageComponent implements OnInit {
  editable: boolean = false
  questionCopy: Question = {
    answers: [{}]
  }
  examId!: number;

  pageReq: PageRequest = {
    page: 0,
    size: 5
  }

  pageRes: PageResponse = {
    data: [],
    totalItems: 0,
    totalPages: 0
  }

  constructor(private examService: ExamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = +this.route.snapshot.params['id']
    this.requestPageData()
  }

  onQuestionSaved(question: Question) {
    console.log(question);
    this.examService.saveQuestion(question, this.examId).subscribe(
      () => {
        this.requestPageData()
      },
      (error: HttpErrorResponse) => {
        console.log(error);
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
          this.requestPageData()
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }

  onEntriesPerPageChange(event: any) {
    this.pageReq.size = +event.target.value;
    this.requestPageData()
  }

  requestPageData() {
    this.examService.getQuestionsPaginated(this.examId, this.pageReq.page, this.pageReq.size)
      .subscribe(
        (data) => {
          this.pageRes = data;
          this.pageReq.pages = [...Array(data.totalPages).keys()]
        }
      )
  }

  //Pagination
  onPreviousPage() {
    if (this.pageReq.page > 0) {
      this.pageReq.page--
      this.requestPageData()
    }
  }

  onNextPage() {
    if (this.pageReq.page < this.pageRes!.totalPages - 1) {
      this.pageReq.page++
      this.requestPageData()
    }
  }

  onSpecifiedPage(pageIndex: number) {
    this.pageReq.page = pageIndex;
    this.requestPageData()
  }

}
