import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { ExamService } from 'src/app/services/exam.service';
import { PageRequest, PageResponse } from "src/app/utils/page.util";
import { WindowUtils } from 'src/app/utils/window.util';
@Component({
  selector: 'app-exam-questions-edit',
  templateUrl: './exam-questions-edit.component.html',
  styleUrls: ['./exam-questions-edit.component.css']
})
export class ExamQuestionsEditComponent implements OnInit {
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
    totalPages: 0
  }

  constructor(private examService: ExamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = +this.route.snapshot.params['id']
    this.requestPageData()
  }

  onQuestionSaved(question: Question) {
    // console.log(question);
    this.examService.saveQuestion(question, this.examId).subscribe(
      () => {
        this.requestPageData();
        alert("Save successfully!")
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  onEditClicked(question: Question) {
    // console.log(question.answers);
    this.editable = true;
    this.questionCopy = { ...question };
    WindowUtils.scrollToElement("#qEdit");
  }

  onFormClosed() {
    this.editable = false
  }

  onAddClicked() {
    this.editable = true
    this.questionCopy = {
      answers: [{}]
    }
    WindowUtils.scrollToElement("#qEdit");
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
    this.pageReq.page = 0;//reset to first page
    this.requestPageData()
  }

  requestPageData() {
    this.examService.getQuestionsPaginated(this.examId, this.pageReq)
      .subscribe(
        (data) => {
          console.log(data);
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
