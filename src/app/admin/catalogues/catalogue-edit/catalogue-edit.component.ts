import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { WindowUtils } from 'src/app/utils/window.util';
import { Category } from '../catalogues-manage/catalogue.model';
import { CatalogueService } from '../catalogues-manage/catalogue.service';

@Component({
  selector: 'app-catalogue-edit',
  templateUrl: './catalogue-edit.component.html',
  styleUrls: ['./catalogue-edit.component.css']
})
export class CatalogueEditComponent implements OnInit {
  @Input() category!: Category
  @Output() closed = new EventEmitter<boolean>();
  parents?: Category[];
  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.catalogueService.cataloguesChanged.subscribe(
      () => {
        this.loadCategories();
      }
    )
  }

  loadCategories() {
    this.catalogueService.getCategoriesPaginated().subscribe(
      (data) => {
        this.parents = data.data;
      }
    )
  }

  onSubmit() {
    console.log(this.category);
    this.catalogueService.saveCategory(this.category).subscribe(
      () => {
        this.catalogueService.cataloguesChanged.next();
        alert("Save catalogue successfully!")
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  onClosed() {
    this.closed.emit();
  }

  viewCatalogQuestions() {
    WindowUtils.scrollToElement(".catalogue-questions");
  }
}
