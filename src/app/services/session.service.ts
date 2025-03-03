import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
// import * as jwtDecode from 'jwt-decode';
import jwtDecode from "jwt-decode";
import { UserInfo } from "../models/infoUser";

@Injectable({
    providedIn: 'root',
})
export class SessionService {

    constructor(private cookieService: CookieService,	private router: Router,) {

    }

    logOut () {
        this.cookieService.set('session', '');
		this.router.navigate(['/auth/login']);
    }

    getCookieToken () {
        return this.cookieService.get('session');
    }

    getToken(): UserInfo {
        let obj = this.getCookieToken();
        let decodeToken: any = jwtDecode(obj);
        return decodeToken.userInfo as UserInfo;
    }

}