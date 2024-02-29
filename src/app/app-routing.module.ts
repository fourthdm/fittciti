import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {path:'', redirectTo:"product", pathMatch:"full"},
  {path:'product',component:ProductComponent},
  {path:'cart',component:CartComponent},
  {path:'**',redirectTo:'product'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
