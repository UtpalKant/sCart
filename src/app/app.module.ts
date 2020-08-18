import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";


// custom components.
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FilterListingComponent } from './dashboard/filter-listing/filter-listing.component';
import { ProductListingComponent } from './dashboard/product-listing/product-listing.component';

// custome services - these are the global services
import { TokenService } from 'src/services/data-service/token.service';
import { AuthGuardService } from 'src/services/guard/auth-guard.service';
import { AuthService } from 'src/services/api-service/auth-api.service';
import { LocalStorageService } from 'src/services/data-service/local-storage.service';
import { ProductService } from 'src/services/api-service/product-api.service';
import { CartService } from "src/services/data-service/cart.service";

// interceptor
import { AuthInterceptor } from 'src/services/interceptor/auth-interceptor';

// custom
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// resolvers
import { ProductResolver } from "src/services/resolver/product.resolver";
import { FilterResolver } from "src/services/resolver/filter.resolver";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent, 
    HeaderComponent,
    FooterComponent,
    ProductListingComponent,
    FilterListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    LocalStorageService,
    TokenService, 
    AuthGuardService, 
    AuthService,
    ProductService,
    ProductResolver,
    FilterResolver,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
