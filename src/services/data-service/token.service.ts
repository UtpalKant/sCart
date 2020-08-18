import { Injectable, EventEmitter } from "@angular/core";
import { User } from 'src/models/user.model';

@Injectable()
export class TokenService {
    private isLoggedIn: boolean;
    private id: number;
    private username: string;
    private fullName: string;
    private isLoggedInEvent: EventEmitter<boolean>;

    constructor(){
        this.isLoggedInEvent = new EventEmitter<boolean>();
    }

    isLogIn(){
        return this.isLoggedInEvent;
    }

    getLoginStatus(): boolean {
        return this.isLoggedIn;
    };

    getUserDetails(): User {
        return {
            id: this.id,
            username: this.username,
            fullName: this.fullName,
            isLoggedIn: this.isLoggedIn
        };
    };

    setUser(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.fullName = user.fullName;
        this.isLoggedIn = user.isLoggedIn;
        this.isLoggedInEvent.emit(user.isLoggedIn);
    };

    logout() {
        this.id = null;
        this.username = null;
        this.fullName = null;
        this.isLoggedIn = null;
        this.isLoggedInEvent.emit(false);
    }
}