import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AppConstants } from "src/app/constants/app.constants";
import { PageRequest, PageResponse } from "src/app/utils/page.util";
import { Category } from "./catalogue.model";

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  API_END_POINT = AppConstants.API_END_POINT + "catalogues";
  catalogueSaved = new Subject<any>();
  constructor(private http: HttpClient) { }

  saveCategory(category: Category): Observable<any> {
    return this.http.post(this.API_END_POINT + "/save", category);
  }

  getCategoriesPaginated(pageReq?: PageRequest): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(this.API_END_POINT);
    }
    pageReq.search ??= "";
    pageReq.sort ??= "id";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&sort=${pageReq.sort}`;
    return this.http.get<PageResponse>(this.API_END_POINT + reqParams);
  }

  getAllQuestions(categoryId: number, pageReq?: PageRequest): Observable<PageResponse> {
    const requestApi = this.API_END_POINT + "/" + categoryId + "/questions";
    if (!pageReq) {
      return this.http.get<PageResponse>(requestApi);
    }
    pageReq.search ??= "";
    pageReq.sort ??= "id";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&sort=${pageReq.sort}`;
    return this.http.get<PageResponse>(requestApi + reqParams);
  }

}
