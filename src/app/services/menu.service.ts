import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
// import * as jwtDecode from 'jwt-decode';
import jwtDecode from "jwt-decode";
import { UserInfo } from "../models/infoUser";
import { HttpClient } from "@angular/common/http";
import { URLMenu } from "src/config/URLConfig";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MenuUsuarioService {

    constructor(private httpClient : HttpClient) { }
  

    getMenu (ideUser: number): Observable <any> {
      return this.httpClient
        .get(URLMenu + ideUser) 
        //.subscribe( (data) => console.log(data) );
    }


}