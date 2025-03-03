import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLlogin } from 'src/config/URLConfig';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }
  

  login (email: string, password: string): Observable <any> {
    return this.httpClient
      .post(URLlogin, { email, password}) 
      //.subscribe( (data) => console.log(data) );
  }
}