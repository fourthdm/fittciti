import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ViewproductComponent } from './pages/viewproduct/viewproduct.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoginComponent } from './common/login/login.component';
import { EnquiryComponent } from './common/enquiry/enquiry.component';
import { RegisterComponent } from './common/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    HomeComponent,
    NavbarComponent,
    ViewproductComponent,
    LoginComponent,
    EnquiryComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
