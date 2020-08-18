import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductService } from 'src/services/api-service/product-api.service';
import { Filter } from "src/models/filter.model";
import { Observable } from 'rxjs';

@Injectable()
export class FilterResolver implements Resolve<any> {
    constructor(private productSvc: ProductService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Filter[]>{
        return this.productSvc.getFilters();
    }
}