import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/models/product.model';
import { Filter } from 'src/models/filter.model';
import { CartService } from 'src/services/data-service/cart.service';
import { FilterData } from 'src/models/filter-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[];
  filters: Filter[];

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService) { 
    this.cartService.getProducts().subscribe(data=>{
      this.products = data;
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { products: Product[], filters: Filter[] }) => { 
      this.cartService.getProducts().emit(data.products); 
      this.cartService.getFilterData().subscribe((filterData: FilterData)=>{
        let result = data.products
        // filterByColor
        .filter(product=>{
          let comparator = true;
          if(filterData.colors.length){
            comparator = filterData.colors.includes(product.colour.color);
          }
          return comparator;
        })
        // filterByMinPrice
        .filter(product=>{
          filterData.minPrice = filterData.minPrice.toString() === "Min" ? 0 : filterData.minPrice;
          return product.price.final_price > filterData.minPrice;
        })
        // filterByMaxPrice
        .filter(product=>{
          filterData.maxPrice = filterData.maxPrice.toString() === "Max" ? Number.POSITIVE_INFINITY : filterData.maxPrice;
          return product.price.final_price < filterData.maxPrice;
        })
        this.cartService.getProducts().emit(result);
      });
      this.filters = data.filters;
    });
  }

}
