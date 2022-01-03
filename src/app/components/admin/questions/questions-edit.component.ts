import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { PageRequest, PageResponse } from 'src/app/utils/page.util';
import { WindowUtils } from 'src/app/utils/window.util';

@Component({
  selector: 'app-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.css']
})
export class QuestionsEditComponent implements OnInit {

  editable: boolean = false
  questionCopy?: Question;

  pageReq: PageRequest = {
    page: 0,
    size: 5
  }

  pageRes: PageResponse = {
    data: [],
    totalPages: 0
  }

  constructor(private questionService: QuestionService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("on changes");
    this.requestPageData();
  }

  ngOnInit(): void {
    this.requestPageData();
  }

  onQuestionSaved(question: Question) {
    this.questionService.save(question).subscribe(
      () => {
        alert("Save question successfully")
        this.requestPageData();
      }, (error) => {
        alert("Error while saving question")
        console.log(error)
      }
    )
  }

  onEditClicked(question: Question) {
    // console.log(question.answers);
    this.editable = true;
    this.questionCopy = { ...question };
    WindowUtils.scrollToElement(".edit-catalog-question");
  }

  onFormClosed() {
    this.editable = false
  }

  onAddClicked() {
    this.editable = true
    this.questionCopy = {
      content: "",
      answers: [{}]
    }
    WindowUtils.scrollToElement(".edit-catalog-question");
  }

  onDeleteClicked(questionId: number) {

  }

  onEntriesPerPageChange(event: any) {
    this.pageReq.size = +event.target.value;
    this.pageReq.page = 0;//reset to first page
    this.requestPageData()
  }

  requestPageData() {
    this.questionService.getAll(this.pageReq)
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
