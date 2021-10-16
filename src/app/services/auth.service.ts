import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../login/login.model";
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, Subject } from "rxjs";
import { AppConstants } from "../constants/app.constants";
import { Profile } from "../profile/profile.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  errorMessage: Subject<string> = new Subject();
  isLoggedin: Subject<boolean> = new Subject();
  constructor(private httpClient: HttpClient) {
    setTimeout(
      () => this.isLoggedin.next(localStorage.length ? true : false), 500
    )
  }

  login(user: LoginRequest) {
    this.httpClient.post<any>(AppConstants.API_END_POINT + "login", user).pipe(
      tap((data) => {
        localStorage.setItem("auth", data.token);
        this.errorMessage.next("");
        this.isLoggedin.next(true)
      }),
      catchError(this.handleError())
    ).subscribe()
  }

  register(profile: Profile) {
    return this.httpClient.post(AppConstants.API_END_POINT + "register", profile);
  }

  private handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status == 400) {
        this.errorMessage.next("Incorrect username or password")
      } else if (error.status == 500) {
        this.errorMessage.next(error.error)
      }
      return of(result as T);
    };
  }

  logout() {
    localStorage.clear()
    this.isLoggedin.next(false)
  }
}
