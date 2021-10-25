import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/app.constants";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class BasicAuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userToken = this.authService.getUserToken();
    if (userToken) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + userToken
        }
      })
      // console.log(req);
    }
    return next.handle(req)
  }

}
