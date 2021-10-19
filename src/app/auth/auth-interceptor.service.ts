import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/app.constants";

@Injectable({ providedIn: 'root' })
export class BasicAuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem(AppConstants.AUTH)) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem(AppConstants.AUTH)
        }
      })
      // console.log(req);
    }
    return next.handle(req)
  }

}
