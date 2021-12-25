import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AppConstants } from "src/app/constants/app.constants";
import { Question } from "src/app/exams/exam-unit/questions/question.model";
import { PageRequest, PageResponse } from "src/app/utils/page.util";
import { Category } from "./catalogue.model";

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  catalogueSaved = new Subject<any>();
  constructor(private http: HttpClient) { }

  saveCategory(category: Category): Observable<any> {
    return this.http.post(AppConstants.API_END_POINT + "catalogues/save", category);
  }

  getCategoriesPaginated(pageReq?: PageRequest): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(AppConstants.API_END_POINT + "catalogues");
    }
    pageReq.search ??= "";
    pageReq.sort ??= "id";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&sort=${pageReq.sort}`;
    return this.http.get<PageResponse>(AppConstants.API_END_POINT + "catalogues" + reqParams);
  }

  getAllQuestions(categoryId: number, pageReq?: PageRequest): Observable<PageResponse> {
    const requestApi = AppConstants.API_END_POINT + "catalogues/" + categoryId + "/questions";
    if (!pageReq) {
      return this.http.get<PageResponse>(requestApi);
    }
    pageReq.search ??= "";
    pageReq.sort ??= "id";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&sort=${pageReq.sort}`;
    return this.http.get<PageResponse>(requestApi + reqParams);
  }

  getAllQuestionsNotIn(catalogId: number, pageReq?: PageRequest): Observable<PageResponse> {
    const requestApi = AppConstants.API_END_POINT + "questions";
    if (!pageReq) {
      return this.http.get<PageResponse>(requestApi);
    }
    pageReq.search ??= "";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&catalog=${catalogId}`;
    return this.http.get<PageResponse>(requestApi + reqParams);
  }

  saveQuestions(catalogId: number, questions: Question[]): Observable<any> {
    console.log(questions);
    const requestApi = AppConstants.API_END_POINT + `catalogues/${catalogId}/save/questions`;
    return this.http.post(requestApi, questions);
  }
}
