import { Component, OnInit } from '@angular/core';
import { PageRequest, PageResponse } from 'src/app/utils/page.util';
import { WindowUtils } from 'src/app/utils/window.util';
import { Catalog } from 'src/app/models/catalogue.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-catalogue-list-edit',
  templateUrl: './catalogue-list-edit.component.html',
  styleUrls: ['./catalogue-list-edit.component.css']
})
export class CatalogueListEditComponent implements OnInit {
  editable: boolean = false;
  catalogCopy: Catalog = {};
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
    this.catalogueService.catalogUpdated.subscribe(
      () => {
        this.requestPageData();
      }
    )
  }

  onClickDelete(id: number) {

  }

  onClickEdit(catalog: Catalog) {
    this.catalogCopy = { ...catalog };
    this.editable = true;
    WindowUtils.scrollToElement("#catEdit");
  }

  //Pagination
  requestPageData() {
    this.catalogueService.getCatalogPaginated(this.pageReq)
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
    this.catalogCopy = {};
    this.editable = true;
    WindowUtils.scrollToElement("#catEdit");
  }

  onFormClosed() {
    this.editable = false;
  }
}
