import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowUtils } from 'src/app/utils/window.util';
import { Category } from '../catalogue.model';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-catalogue-edit',
  templateUrl: './catalogue-edit.component.html',
  styleUrls: ['./catalogue-edit.component.css']
})
export class CatalogueEditComponent implements OnInit {
  @Input() category!: Category
  @Output() closed = new EventEmitter<boolean>();
  parents?: Category[];
  questionsView = false;
  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.questionsView = false;
    this.catalogueService.getCategoriesPaginated().subscribe(
      (data) => {
        this.parents = data.data;
      }
    )
  }

  onSubmit() {
    this.catalogueService.saveCategory(this.category).subscribe(
      () => {
        this.catalogueService.catalogueSaved.next();
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
    this.questionsView = true;
    WindowUtils.scrollToElement(".catalogue-questions");
  }
}
