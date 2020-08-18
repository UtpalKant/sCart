import { Component } from '@angular/core';
import { TokenService } from 'src/services/data-service/token.service';
import { LocalStorageService } from 'src/services/data-service/local-storage.service';
import { CartService } from 'src/services/data-service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeader: boolean;
  cartLength: number;
  user: string;
  constructor(private tokenSvc: TokenService,
    private localSvc: LocalStorageService,
    private cartSvc: CartService) {
    // set subscribers
    this.tokenSvc.isLogIn().subscribe(data => {
      this.showHeader = data;
    });
    this.cartSvc.getCartLength().subscribe(data=>{
      this.cartLength = data;
    });
    
    // read saved data from LocalStorage
    this.localSvc.getUser();
    this.cartSvc.getCart();
  }
}
