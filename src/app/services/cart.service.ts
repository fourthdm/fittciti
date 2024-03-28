import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class CartService {



  @Input() id = 0;
  @Input() Quantity = 1;

  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private _rest: RestService, private _http: HttpClient,
    private _route: Router, private _state: StateService) { }

  getProducts() {
    return this.productList.asObservable();

  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  // add to cart
  addtoCart(product: any) {

    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.Gettotal();
    console.log(this.cartItemList);
  }




  add(product: any) {
    this._rest.addtoCart(product).subscribe((data: any) => {
      console.log(data);
      this.cartItemList.push(data);
      this.cartItemList = data.data
    }, (err: any) => {
      console.log(err);
      // this._route.navigate(['/login']);
    })

  }


  // get totl price
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.pricewithdiscount;
    })
    return grandTotal;
  }

  getFinaltotalPrice(): number {
    let finalTotal = 0;
    this.cartItemList.map((a: any) => {
      finalTotal += a.Total;
    })
    return finalTotal;
  }

  Gettotal(): number {
    let T = 0;
    this.cartItemList.map((a: any) => {
      T += a.Price;
    })
    return T;
  }

  // remove single item
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList)
  }

  removeproduct(product: any) {
    this._state.checktoken();
    this._rest.deleteproductfromcart(product.Product_id).subscribe((data: any) => {
    })

    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList)
  }

  // empty cart at a time
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

}
