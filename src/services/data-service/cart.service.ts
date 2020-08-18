import { Injectable, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { LocalStorageService } from './local-storage.service';
import { FilterData } from 'src/models/filter-data.model';

@Injectable()
export class CartService {
    private cartlength: EventEmitter<number>;
    private products: EventEmitter<Product[]>;
    private filterData: EventEmitter<FilterData>;

    constructor(private localSvc: LocalStorageService){
        this.cartlength = new EventEmitter<number>();
        this.products = new EventEmitter<Product[]>();
        this.filterData = new EventEmitter<FilterData>()
    }

    getCartLength(): EventEmitter<number>{
        return this.cartlength;
    }

    getFilterData(): EventEmitter<FilterData>{
        return this.filterData;
    }

    getProducts(): EventEmitter<Product[]>{
        return this.products;
    }

    addToCart(item: Product){
        const cart = this.localSvc.getCart();
        cart.push(item);
        this.localSvc.setCart(cart);
        this.cartlength.emit(cart.length);
    }

    getCart(){
        const cart = this.localSvc.getCart();
        this.cartlength.emit(cart.length);
    }
}