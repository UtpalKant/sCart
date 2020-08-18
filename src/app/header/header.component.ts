import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/services/api-service/product-api.service';
import { CartService } from 'src/services/data-service/cart.service';
import { TokenService } from 'src/services/data-service/token.service';
import { FilterData } from 'src/models/filter-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() cartLength: number;
  user: string;
  searchKey: string;

  constructor(
    private productSvc: ProductService, 
    private cartService: CartService, 
    private tokenSvc: TokenService
    ) {
      this.user = this.tokenSvc.getUserDetails().username;
      this.searchKey = ""
  }

  ngOnInit(): void {
  }

  searchProducts(searchKey){
    this.productSvc.searchProduct(searchKey).subscribe((data)=>{
      this.cartService.getProducts().emit(data);
      this.cartService.getFilterData().subscribe((filterData: FilterData)=>{
        let result = data
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
    }, error=>{
      // log on error.
    }, ()=>{
      // on complete.
    });
  }

}
