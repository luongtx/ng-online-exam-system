import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PageRequest, PageResponse } from "../utils/page.util";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/app.constants";
import { Question } from "../models/question.model";

@Injectable({ providedIn: 'root' })
export class QuestionService {
  API_QUESTION = AppConstants.API_END_POINT + "questions/";
  constructor(private http: HttpClient) { }

  getAll(pageReq?: PageRequest, catalogId?: number, examId?: number): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(this.API_QUESTION);
    }
    pageReq.search ??= "";
    let reqParams = new HttpParams();
    reqParams = reqParams.append("page", pageReq.page);
    reqParams = reqParams.append("size", pageReq.size);
    if (catalogId) {
      reqParams = reqParams.append("catalog", catalogId);
    }
    if (examId) {
      reqParams = reqParams.append("exam", examId);
    }
    return this.http.get<PageResponse>(this.API_QUESTION + "all", { params: reqParams });
  }

  getAllQuestionsNotInCatalog(catalogId: number, pageReq?: PageRequest): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(this.API_QUESTION);
    }
    pageReq.search ??= "";
    let reqParams = new HttpParams();
    reqParams = reqParams.append("page", pageReq.page);
    reqParams = reqParams.append("size", pageReq.size);
    reqParams = reqParams.append("search", pageReq.search);
    reqParams = reqParams.append("catalog", catalogId);
    return this.http.get<PageResponse>(this.API_QUESTION + "exclude-catalog", { params: reqParams });
  }

  getAllQuestionsNotInExam(examId: number, pageReq?: PageRequest): Observable<PageResponse> {
    if (!pageReq) {
      return this.http.get<PageResponse>(this.API_QUESTION);
    }
    pageReq.search ??= "";
    let reqParams = new HttpParams();
    reqParams = reqParams.append("page", pageReq.page);
    reqParams = reqParams.append("size", pageReq.size);
    reqParams = reqParams.append("search", pageReq.search);
    reqParams = reqParams.append("exam", examId);
    return this.http.get<PageResponse>(this.API_QUESTION + "exclude-exam", { params: reqParams });
  }

  save(question: Question): Observable<any> {
    // console.log(question);
    const requestApi = this.API_QUESTION + "save";
    return this.http.post(requestApi, question);
  }

  delete(id: number, catalogId?: number, examId?: number): Observable<any> {
    // const reqParams = `?catalog=${catalogId}&exam=${examId}`;
    let reqParams = new HttpParams();
    if (catalogId) {
      reqParams = reqParams.append("catalog", catalogId);
    }
    if (examId) {
      reqParams = reqParams.append("exam", examId);
    }
    return this.http.delete(this.API_QUESTION + id + "/delete", { params: reqParams });
  }

}
