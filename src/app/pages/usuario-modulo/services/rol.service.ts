import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { URLRolByUser, UrlRol } from 'src/app/config/URLconfig';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private httpClient : HttpClient) { }

  getList (): Observable<any> {
    return this.httpClient.get(UrlRol);
   /*.pipe( 
      retry(0), 
      catchError(this.httpErrorHandler)) */
   //.subscribe( (data) => console.log(data) );
  }

  getRoleByUser (userId: string):Observable<any> {
    return this.httpClient.get(URLRolByUser+userId);
  }

  add (rol:any): Observable<any>  {
    return this.httpClient.post(UrlRol, rol);
  }

  private httpErrorHandler (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
       console.error("A client side error occurs. The error message is " + error.message);
       } else {
          console.error(
             "An error happened in server. The HTTP status code is "  + error.status + " and the error returned is " + error.message);
       }
    return throwError("Error occurred. Pleas try again");
 }

}
