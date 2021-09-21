import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, resolveForwardRef } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable({
    providedIn: 'root'
  })
  export class TokenInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log("in token interceptor service");

        if(req.url.includes('/authenticate')){
            return next.handle(req);
        }
        let tokenreq = req.clone({
            setHeaders:{
                Authorization : 'Bearer '+ this.authService.getJWTToken()
            }
        })
        return next.handle(tokenreq);
    }
      
  }