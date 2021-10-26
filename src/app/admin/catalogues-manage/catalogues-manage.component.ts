import { Component, OnInit } from '@angular/core';
import { PageRequest, PageResponse } from 'src/app/utils/page.util';
import { WindowUtils } from 'src/app/utils/window.util';
import { Category } from './catalogue.model';
import { CatalogueService } from './catalogue.service';

@Component({
  selector: 'app-catalogues-manage',
  templateUrl: './catalogues-manage.component.html',
  styleUrls: ['./catalogues-manage.component.css']
})
export class CataloguesManageComponent implements OnInit {
  editable: boolean = false;
  categoryCopy: Category = {};
  constructor(private catalogueService: CatalogueService) { }

  pageReq: PageRequest = {
    page: 0,
    size: 5
  }

  pageRes: PageResponse = {
    data: [],
    totalPages: 0
  }

  ngOnInit(): void {
    this.requestPageData();
    this.catalogueService.catalogueSaved.subscribe(
      () => {
        this.requestPageData();
      }
    )
  }

  onClickDelete(id: number) {

  }

  onClickEdit(category: Category) {
    this.categoryCopy = { ...category };
    this.editable = true;
    WindowUtils.scrollToElement("#catEdit");
  }

  //Pagination
  requestPageData() {
    this.catalogueService.getCategoriesPaginated(this.pageReq)
      .subscribe(
        (data) => {
          this.pageRes = data;
          this.pageReq.pages = [...Array(data.totalPages).keys()]
        }
      )
  }

  onNextPage() {
    if (this.pageReq.page < this.pageRes!.totalPages - 1) {
      this.pageReq.page++
      this.requestPageData()
    }
  }

  onPreviousPage() {
    if (this.pageReq.page > 0) {
      this.pageReq.page--
      this.requestPageData()
    }
  }

  onSpecifiedPage(pageIndex: number) {
    this.pageReq.page = pageIndex;
    this.requestPageData()
  }

  onEntriesPerPageChange(event: any) {
    this.pageReq.size = event.target.value;
    this.pageReq.page = 0;
    this.requestPageData();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.requestPageData();
    }
  }

  onClickNew() {
    this.categoryCopy = {};
    this.editable = true;
    WindowUtils.scrollToElement("#catEdit");
  }

  onFormClosed() {
    this.editable = false;
  }
}
