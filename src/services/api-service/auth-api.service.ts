import { HttpClient } from "@angular/common/http";
import { TokenService } from "src/services/data-service/token.service";
import { Injectable } from "@angular/core";
import { config } from "src/global.config";
import { environment } from "src/environments/environment";
import { User } from "src/models/user.model"
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private baseURL: string;
    constructor(private http: HttpClient, private tokenSvc: TokenService){
        this.baseURL = config[environment.name].baseURL;
    }

    login(userName, password): Observable<User[]>{
        const url = this.baseURL + "users" + `?username=${userName}`;
        return this.http.get<User[]>(url);
    }
}