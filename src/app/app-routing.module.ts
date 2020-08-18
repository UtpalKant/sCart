import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from 'src/services/guard/auth-guard.service';
import { ProductResolver } from 'src/services/resolver/product.resolver';
import { FilterResolver } from 'src/services/resolver/filter.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuardService], 
    resolve: { products: ProductResolver, filters: FilterResolver } 
  },
  { path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
