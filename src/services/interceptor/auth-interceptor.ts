import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    count = 0;
    constructor(private spinner: NgxSpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.count++;
        this.spinner.show();
        return next.handle(req)
            .pipe ( tap (
                    event => console.log(event),
                    error => console.log( error )
                ), finalize(() => {
                    this.count--;
                    if(this.count === 0) this.spinner.hide();
                })
            );
    }
}