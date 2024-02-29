import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;
  public T !: any;

  constructor(private _cart: CartService) { }

  ngOnInit(): void {

    this._cart.getProducts().subscribe((data: any) => {
      console.log('Cart Products : ', data);
      this.products = data;
      this.T = this._cart.Gettotal();
      this.grandTotal = this._cart.getTotalPrice();
    }, (err: any) => {
      console.log(err)
    })
    // this._cart.getProducts().subscribe((resp: any) => {
    //   this.products = resp;
    //   this.grandTotal = this._cart.getTotalPrice();
    // }, (err: any) => {
    //   console.log(err)
    // })
  }
  removeItem(item: any) {
    this._cart.removeCartItem(item)
  }

  emptycart() {
    this._cart.removeAllCart();
  }

  paynow() {
    const razorpayoption = {
      description: 'sample razorpay demo',
      currency: 'INR',
      // amount: 200000,
      amount: this.grandTotal * 100,
      name: 'Fittciti',
      key: 'rzp_live_kFr6gQiD2PCk11',
      image: 'https://t4.ftcdn.net/jpg/06/09/50/93/360_F_609509369_6xlux7VFjFMb0pORhdrJG4zdyn4s6EHO.jpg',
      prefill: {
        name: 'Fittciti',
        email: 'fittciti@gmail.com',
        phone: '020 4124 2513'
      },
      theme: {
        color: '#'
      },

      modal: {
        ondismiss: () => {
          console.log('dismissed')
        }
      }
    }
    const successCallback = (paymentid: any) => {
      console.log(paymentid)
    }
    const failurecallback = (e: any) => {
      console.log(e);
    }
    Razorpay.open(razorpayoption, successCallback, failurecallback)
  }

}
