import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageRequest, PageResponse} from "../utils/page.util";
import {Observable} from "rxjs";
import {AppConstants} from "../constants/app.constants";

@Injectable({providedIn: 'root'})
export class QuestionService {
  constructor(private http: HttpClient) { }

  getAllQuestionsNotInCatalog(catalogId: number, pageReq?: PageRequest): Observable<PageResponse> {
    const requestApi = AppConstants.API_END_POINT + "questions";
    if (!pageReq) {
      return this.http.get<PageResponse>(requestApi);
    }
    pageReq.search ??= "";
    const reqParams = `?page=${pageReq.page}&size=${pageReq.size}&search=${pageReq.search}&catalog=${catalogId}`;
    return this.http.get<PageResponse>(requestApi + reqParams);
  }
}
