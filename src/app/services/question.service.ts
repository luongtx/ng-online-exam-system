import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PageRequest, PageResponse } from "../utils/page.util";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/app.constants";
import { Question } from "../models/question.model";

@Injectable({ providedIn: 'root' })
export class QuestionService {
  API_QUESTION = AppConstants.API_END_POINT + "questions/";
  constructor(private http: HttpClient) { }

  getAll(pageReq?: PageRequest): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(this.API_QUESTION);
    }
    pageReq.search ??= "";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}`;
    return this.http.get<PageResponse>(this.API_QUESTION + "all" + reqParams);
  }

  getAllQuestionsNotInCatalog(catalogId: number, pageReq?: PageRequest): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(this.API_QUESTION);
    }
    pageReq.search ??= "";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&catalog=${catalogId}`;
    return this.http.get<PageResponse>(this.API_QUESTION + "exclude-catalog" + reqParams);
  }

  getAllQuestionsNotInExam(examId: number, pageReq?: PageRequest): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(this.API_QUESTION);
    }
    pageReq.search ??= "";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&exam=${examId}`;
    return this.http.get<PageResponse>(this.API_QUESTION + "exclude-exam" + reqParams);
  }

  save(question: Question): Observable<any> {
    // console.log(question);
    const requestApi = this.API_QUESTION + "save";
    return this.http.post(requestApi, question);
  }
}
