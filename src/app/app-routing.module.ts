import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewproductComponent } from './pages/viewproduct/viewproduct.component';
import { DymatizeComponent } from './brand/dymatize/dymatize.component';
import { In2Component } from './brand/in2/in2.component';
import { InsanelabzComponent } from './brand/insanelabz/insanelabz.component';
import { MuscletechComponent } from './brand/muscletech/muscletech.component';
import { GncComponent } from './brand/gnc/gnc.component';
import { BsnComponent } from './brand/bsn/bsn.component';
import { Healthinnvo8Component } from './brand/healthinnvo8/healthinnvo8.component';
import { OnComponent } from './brand/on/on.component';
import { RcComponent } from './brand/rc/rc.component';
import { MbComponent } from './brand/mb/mb.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'viewproduct/:id', component: ViewproductComponent },

  { path: 'Dymatize', component: DymatizeComponent },
  { path: 'In2', component: In2Component },
  { path: 'Insanelabz', component: InsanelabzComponent },
  { path: 'Muscletech', component: MuscletechComponent },
  { path: 'Gnc', component: GncComponent },
  { path: 'Bsn', component: BsnComponent },
  { path: 'Healthinnva8', component: Healthinnvo8Component },
  { path: 'OptimumNutrition', component: OnComponent },
  { path: 'Roniniecoleman', component: RcComponent },
  { path: 'Muscleblaze', component: MbComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
