import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { UrlRol, URL_Opcion } from "src/app/config/URLconfig";

@Injectable({
    providedIn: 'root',
})
export class OpcionService {

   constructor(private router: Router, private httpClient : HttpClient) {
   }

   getList (): Observable<any> {
      return this.httpClient.get(URL_Opcion);
      /*.pipe( 
         retry(0), 
         catchError(this.httpErrorHandler)) */
      //.subscribe( (data) => console.log(data) );
   }
    
   add (opcion:any): Observable<any>  {
      return this.httpClient.post(URL_Opcion, opcion);
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