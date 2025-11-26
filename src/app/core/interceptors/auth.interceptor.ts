import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { url } from '../environment/baseUrl';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const spinner = inject(NgxSpinnerService)
     const cookies = inject(CookieService)
      const platformId = inject(PLATFORM_ID);
        let Token: string = '';
       if (isPlatformBrowser(platformId)) {
     Token = cookies.get('accessToken')  
       }

  const myReq = req.clone({
     url : url.baseUrl + req.url,
   setHeaders: {
     Authorization: Token ?`Bearer ${Token}` : '', 'Content-Type': 'application/json',
    },
  })

  spinner.show()

  return next(myReq).pipe(
  tap((event) => {
    if(event instanceof HttpResponse ){
    
    }
   
  }),

  catchError((err) => {
   
    return throwError(() => err);
  }),
  finalize(() => {
    spinner.hide();
  })



  );
};
