import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PageRequest, PageResponse } from "src/app/utils/page.util";
import { environment } from "src/environments/environment";
import { Catalog } from "../models/catalogue.model";
import { Question } from "../models/question.model";
import { QuestionService } from "./question.service";

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  catalogUpdated = new Subject<any>();
  API_CATALOG = environment.apiUrl + "catalogues/";
  constructor(private http: HttpClient, private questionService: QuestionService) { }

  saveCatalog(catalog: Catalog): Observable<any> {
    return this.http.post(this.API_CATALOG + "save", catalog);
  }

  getCatalogPaginated(pageReq?: PageRequest): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(this.API_CATALOG);
    }
    pageReq.search ??= "";
    pageReq.sort ??= "id";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&sort=${pageReq.sort}`;
    return this.http.get<PageResponse>(this.API_CATALOG + reqParams);
  }

  getAllQuestions(catalogId: number, pageReq?: PageRequest): Observable<PageResponse> {
    const requestApi = this.API_CATALOG + catalogId + "/questions";
    if (!pageReq) {
      return this.http.get<PageResponse>(requestApi);
    }
    pageReq.search ??= "";
    pageReq.sort ??= "id";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&sort=${pageReq.sort}`;
    return this.http.get<PageResponse>(requestApi + reqParams);
  }

  saveQuestions(catalogId: number, questionIds: number[]): Observable<any> {
    console.log(questionIds);
    const requestApi = this.API_CATALOG + `${catalogId}/save/questions`;
    return this.http.post(requestApi, questionIds);
  }

  removeQuestion(questionId: number) : Observable<any> {
    console.log(questionId);
    const requestApi = this.API_CATALOG + `remove/question/${questionId}`;
    return this.http.delete(requestApi);
  }

  getAllQuestionsNotIn(catalogId: number, pageReq: PageRequest) {
    return this.questionService.getAllQuestionsNotInCatalog(catalogId, pageReq);
  }

  updateCatalogQuestion(question: Question) {
    return this.questionService.save(question);
  }
}
