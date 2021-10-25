import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../login/login.model";
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, Subject } from "rxjs";
import { AppConstants } from "../constants/app.constants";
import { Profile } from "../profile/profile.model";
import { User } from "../common/user.model";
import { RoleConstants } from "../constants/role.constants";

@Injectable({ providedIn: 'root' })
export class AuthService {
  errorMessage: Subject<string> = new Subject();
  authenticated: Subject<boolean> = new Subject();
  constructor(private httpClient: HttpClient) {
    setTimeout(
      () => this.authenticated.next(localStorage.length ? true : false), 100
    );
    this.autoLogout();
  }

  login(user: LoginRequest) {
    this.httpClient.post<User>(AppConstants.API_END_POINT + "login", user).pipe(
      tap((data) => {
        localStorage.setItem("_user", JSON.stringify(data));
        this.errorMessage.next("");
        this.authenticated.next(true);
        this.autoLogout();
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
    localStorage.removeItem("_user");
    this._user = undefined;
    this.authenticated.next(false);
  }

  checkAdminRole(): boolean {
    let _user = this.getUser();
    if (_user) {
      return _user.roles.includes(RoleConstants.ROLE_ADMIN);
    }
    return false;
  }

  checkAuthenticated(): boolean {
    return localStorage.getItem("_user") ? true : false;
  }

  _user?: User;
  getUser() {
    if (this._user) {
      return this._user;
    }
    let userStr = localStorage.getItem("_user");
    if (userStr) {
      this._user = JSON.parse(userStr) as User;
    }
    return this._user;
  }

  getUserToken() {
    let _user = this.getUser();
    return _user?.token;
  }

  autoLogout() {
    let _user = this.getUser();
    let expiredTime = _user?.expiredAt;
    if (expiredTime) {
      let timeOut = expiredTime - Date.now();
      console.log(timeOut);
      setTimeout(
        () => {
          this.logout();
          alert("Your session has expired, please login again!")
        }, timeOut
      )
    }
  }
}
