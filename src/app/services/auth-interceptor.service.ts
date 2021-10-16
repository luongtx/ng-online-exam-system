import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BasicAuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('auth')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('auth')
        }
      })
      console.log(req);
    }
    return next.handle(req)
  }

}
