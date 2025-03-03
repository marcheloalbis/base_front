import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { UrlUser } from 'src/app/config/URLconfig';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient : HttpClient) { }

  getListUser (): Observable<any> {
    return this.httpClient.get(UrlUser);
   /*.pipe( 
      retry(0), 
      catchError(this.httpErrorHandler)) */
   //.subscribe( (data) => console.log(data) );
  }

   add (opcion:any): Observable<any>  {
      return this.httpClient.post(UrlUser, opcion);
   }

   getOnlyUser (ide:number): Observable<any>  {
      return this.httpClient.get(UrlUser +'/'+ ide);
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
