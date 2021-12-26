import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowUtils } from 'src/app/utils/window.util';
import { Catalog } from 'src/app/models/catalogue.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-catalogue-edit',
  templateUrl: './catalogue-edit.component.html',
  styleUrls: ['./catalogue-edit.component.css']
})
export class CatalogueEditComponent implements OnInit {
  @Input() catalog!: Catalog
  @Output() closed = new EventEmitter<boolean>();
  parents?: Catalog[];
  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.catalogueService.getCatalogPaginated().subscribe(
      (data) => {
        this.parents = data.data;
      }
    )
  }

  onSubmit() {
    this.catalogueService.saveCatalog(this.catalog).subscribe(
      () => {
        this.catalogueService.catalogUpdated.next();
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

}
