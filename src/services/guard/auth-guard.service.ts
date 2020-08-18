import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { TokenService } from 'src/services/data-service/token.service'

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public auth: TokenService, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const isLoggedIn = this.auth.getLoginStatus();
        if(!isLoggedIn){
            this.router.navigate(['/login']);
        }
        return isLoggedIn;
    }
}