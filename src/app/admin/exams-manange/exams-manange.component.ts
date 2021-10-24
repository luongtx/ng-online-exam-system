import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/exams/shared/exam.model';
import { ExamService } from 'src/app/exams/shared/exam.service';
import { PageRequest, PageResponse } from "src/app/utils/page.util";

@Component({
  selector: 'app-exams-manange',
  templateUrl: './exams-manange.component.html',
  styleUrls: ['./exams-manange.component.css']
})
export class ExamsManageComponent implements OnInit {
  editable: boolean = false;
  constructor(private examService: ExamService) { }

  pageReq: PageRequest = {
    page: 0,
    size: 5
  }

  pageRes: PageResponse = {
    data: [],
    totalPages: 0
  }

  ngOnInit(): void {
    this.requestPageData()
    this.examService.examSaved.subscribe(
      () => this.requestPageData()
    )
  }

  onClickDelete(id: number) {
    if (confirm("Are you sure to delete this exam")) {
      this.examService.deleteExam(id).subscribe(
        () => {
          this.requestPageData()
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }

  examCopy: Exam = {}
  onClickEdit(exam: Exam) {
    this.examCopy = { ...exam };
    this.editable = true;
    this.scrollToElement("#edit");
  }

  onClickNew() {
    this.examCopy = {};
    this.editable = true;
    this.scrollToElement("#edit");
  }

  requestPageData() {
    this.examService.getExamsPaginated(this.pageReq)
      .subscribe(
        (data) => {
          this.pageRes = data;
          this.pageReq.pages = [...Array(data.totalPages).keys()]
        }
      )
  }

  onEntriesPerPageChange(event: any) {
    this.pageReq.size = event.target.value;
    this.pageReq.page = 0;
    this.requestPageData();
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

  onKeyDown(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.requestPageData();
    }
  }

  scrollToElement(elementRef: string) {
    const element = document.querySelector(elementRef);
    element?.scrollIntoView();
  }

}
