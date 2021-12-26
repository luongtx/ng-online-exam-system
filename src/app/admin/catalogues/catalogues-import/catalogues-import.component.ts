import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Question } from 'src/app/exams/exam-unit/questions/question.model';
import { PageRequest, PageResponse } from 'src/app/utils/page.util';
import { CatalogueService } from '../catalogues-manage/catalogue.service';

@Component({
  selector: 'app-catalogues-import',
  templateUrl: './catalogues-import.component.html',
  styleUrls: ['./catalogues-import.component.css']
})
export class CataloguesImportComponent implements OnInit {

  catalogId: number = 0;

  importIds: number[] = [];

  pageReq: PageRequest = {
    page: 0,
    size: 5
  }

  pageRes: PageResponse = {
    data: [],
    totalPages: 0
  }

  constructor(private catalogSerivce: CatalogueService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.catalogId = +params['id'];
        this.requestPageData();
      }
    )
  }

  onQuestionChecked(questionId: number, event: any) {
    if (event.target.checked) {
      console.log("checked");
      this.importIds.push(questionId);
    } else {
      console.log("unchecked");
      const index = this.importIds.indexOf(questionId);
      this.importIds.splice(index, 1);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    this.requestPageData();
  }


  onEntriesPerPageChange(event: any) {
    this.pageReq.size = +event.target.value;
    this.pageReq.page = 0;//reset to first page
    this.requestPageData()
  }

  requestPageData() {
    this.catalogSerivce.getAllQuestionsNotIn(this.catalogId, this.pageReq).subscribe(
      (data: PageResponse) => {
        this.pageRes.data = data.data;
      }
    );
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

  onImportClicked() {
    this.catalogSerivce.saveQuestions(this.catalogId, this.importIds).subscribe(
      () => {
        alert("Import question successfully!")
        history.back();
      }
    );
  }

}
