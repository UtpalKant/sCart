import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { User } from 'src/models/user.model';
import { Product } from 'src/models/product.model';

@Injectable()
export class LocalStorageService{
    constructor(private tokenSvc: TokenService){}
    setUser(user): void{
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser(): void{
        const user: User = JSON.parse(localStorage.getItem("user"));
        if(user){
            this.tokenSvc.setUser(user);
        }
    }

    setCart(cart): void{
        // set cart based on user key
        const user = this.tokenSvc.getUserDetails();
        if(user.id){
            localStorage.setItem(user.id.toString(), JSON.stringify(cart));
        }
    }

    getCart(): Product[]{
        const user = this.tokenSvc.getUserDetails();
        let cart = [];
        if(user.id){
            const cartString = localStorage.getItem(user.id.toString());
            cart = cartString ? JSON.parse(cartString) : [];
        }
        return cart;
    }

    logOut() {
        localStorage.removeItem("user");
        this.tokenSvc.logout();
    }
}