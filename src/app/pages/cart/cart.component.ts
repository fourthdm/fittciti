import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

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
  public Savers !: any;
  Quantity: number = 1
  public finalTotal !: any;

  constructor(private _cart: CartService, private _route: Router, private _rest: RestService) { }

  ngOnInit(): void {
    this._cart.getProducts().subscribe((data: any) => {
      console.log('Cart Products : ', data);
      this.products = data;
      this.finalTotal = this._cart.getFinaltotalPrice();
      this.T = this._cart.Gettotal();
      this.grandTotal = this._cart.getTotalPrice();
      this.Savers = this.T - this.grandTotal;
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


  // delete(productId: number){
  //   let index = this.products.map((e:any)=> e.id).indexOf(productId);
  //   if(index !== -1){
  //     this._rest.deleteproductfromcart(productId).then(()=>{
  //       this.products.splice(index, 1);
  //       alert("Item removed from cart");
  //     }).catch((error: any)=>{
  //       console.log("Error", error);
  //     });

  //   }else{
  //     alert("The item was not found in the cart")
  //   } 
  // }

  deletecartitem() {

  }

  removeItem(item: any) {
    this._cart.removeproduct(item)
  }

  emptycart() {
    this._cart.removeAllCart();
    this._route.navigate(['/product']);
  }

  handleQuantity(val: string) {
    if (this.Quantity < 20 && val === 'plus') {
      this.Quantity += 1;
    } else if (this.Quantity > 1 && val === 'min') {
      this.Quantity -= 1;
    }
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
