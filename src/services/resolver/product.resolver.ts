import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../api-service/product-api.service';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductResolver implements Resolve<any> {
    constructor(private productSvc: ProductService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
        return this.productSvc.getProducts().pipe();
    }
}