import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  pro: any;

  constructor(private _rest: RestService, private _cart: CartService) { }

  ngOnInit(): void {
    this._rest.homeproduct().subscribe((data: any) => {
      this.productList = data.data;
    }, (err: any) => {
      console.log(err);
    })

    this.productList.forEach((a: any) => {
      Object.assign(a, { quantity: 1, total: a.pricewithdiscount });
    });
  }

  addToCart(product: any) {
    this._cart.addtoCart(product);
  }
}