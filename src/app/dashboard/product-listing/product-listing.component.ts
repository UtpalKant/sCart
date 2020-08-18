import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product.model';
import { CartService } from 'src/services/data-service/cart.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  @Input() products: Product[];

  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
  }

  addToCart(item: Product){
    this.cartSvc.addToCart(item);
  }
}
