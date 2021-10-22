import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/exams/shared/exam.model';
import { ExamService } from 'src/app/exams/shared/exam.service';
import { Page } from 'src/app/shared/page.model';

@Component({
  selector: 'app-exams-manange',
  templateUrl: './exams-manange.component.html',
  styleUrls: ['./exams-manange.component.css']
})
export class ExamsManageComponent implements OnInit {
  exams: Exam[] = [];
  isNew: boolean = false;
  constructor(private examService: ExamService) { }

  page: Page = {
    page: 0,
    size: 5
  }

  ngOnInit(): void {
    this.loadData()
    this.examService.examSaved.subscribe(
      () => this.loadData()
    )
  }

  loadData() {
    this.examService.getExamsPaginated(this.page.page, this.page.size).subscribe(
      (data) => {
        this.exams = data.data;
        this.page.totalItem = data.totalItems;
        this.page.totalPages = data.totalPages;
        this.page.pages = [...Array(data.totalPages).keys()];
      }
    )
  }

  onDeleteExam(id: number) {
    if (confirm("Are you sure to delete this exam")) {
      this.examService.deleteExam(id).subscribe(
        () => {
          alert("Delete exam successfully!")
          this.loadData()
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }

  requestDataOnPage(pageNum: number) {
    this.examService.getExamsPaginated(this.page.page, this.page.size)
      .subscribe(
        (data) => {
          this.exams = data.data
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
