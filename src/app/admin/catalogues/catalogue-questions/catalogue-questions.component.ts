import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/exams/exam-unit/questions/question.model';
import { PageRequest, PageResponse } from 'src/app/utils/page.util';
import { WindowUtils } from 'src/app/utils/window.util';
import { CatalogueService } from '../catalogues-manage/catalogue.service';

@Component({
  selector: 'app-catalogue-questions',
  templateUrl: './catalogue-questions.component.html',
  styleUrls: ['./catalogue-questions.component.css']
})
export class CatalogueQuestionsComponent implements OnInit {
  @Input() categoryId!: number;
  editable: boolean = false
  questionCopy: Question = {
    answers: [{}]
  }

  pageReq: PageRequest = {
    page: 0,
    size: 5
  }

  pageRes: PageResponse = {
    data: [],
    totalPages: 0
  }

  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.requestPageData();
  }

  onQuestionSaved(question: Question) {
    // console.log(question);

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

    }
  }

  onEntriesPerPageChange(event: any) {
    this.pageReq.size = +event.target.value;
    this.pageReq.page = 0;//reset to first page
    this.requestPageData()
  }

  requestPageData() {
    this.catalogueService.getAllQuestions(this.categoryId, this.pageReq)
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
