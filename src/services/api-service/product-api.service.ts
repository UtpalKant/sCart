import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from "src/global.config";
import { environment } from "src/environments/environment";

import { Product } from "src/models/product.model"
import { Filter } from "src/models/filter.model";
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    private baseURL: string;
    constructor(private http: HttpClient){
        this.baseURL = config[environment.name].baseURL;
    }

    getProducts(): Observable<Product[]>{
        const url = this.baseURL + "products";
        return this.http.get<Product[]>(url);
    }

    getFilters(): Observable<Filter[]> {
        const url = this.baseURL + "filters";
        return this.http.get<Filter[]>(url);
    }

    searchProduct(key): Observable<Product[]>{
        const url = this.baseURL + "products" + `?title=${key}`;
        return this.http.get<Product[]>(url);
    }
}