import { Component, OnInit } from '@angular/core';
import { PageRequest, PageResponse } from 'src/app/utils/page.util';
import { Exam } from '../shared/exam.model';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  constructor(private examService: ExamService) { }
  pageReq: PageRequest = {
    page: 0,
    size: 3
  }

  pageRes: PageResponse = {
    data: [],
    totalPages: 0
  }

  ngOnInit(): void {
    this.requestPageData();
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
