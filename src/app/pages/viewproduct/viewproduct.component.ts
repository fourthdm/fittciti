import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  productList: any[] = [];
  pro: any;
  cart: any[] = [];

  productQuantity: number = 1;
  constructor(private _rest: RestService, private _cart: CartService, private _activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getproduct();
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  getproduct() {
    const id = this._activeroute.snapshot.paramMap.get('id');
    console.log(id);
    id && this._rest.productwithmain(id).subscribe((data: any) => {
      this.productList = data.data;
    }, (err: any) => {
      console.log(err);
    })

    this.productList.forEach((a: any) => {
      Object.assign(a, { quantity: 1, total: a.pricewithdiscount });
    });
  }

  // AddToCart() {
  //   if (this.cart) {
  //     this.cart.Quantity = this.productQuantity;
  //     if (!localStorage.getItem('user')) {
  //       this._rest.localAddToCart(this.productList);
  //       // this._rest.removecart = true
  //     } else {
  //       let user = localStorage.getItem('user');
  //       let userId = user && JSON.parse(user).id;
  //       let cartData: any = {
  //         ...this.cart,
  //         productId: this.cart.id,
  //         userId
  //       }
  //       delete cartData.id;
  //       this.product.addToCart(cartData).subscribe((result) => {
  //         if (result) {
  //           this.product.getCartList(userId);
  //           this.removeCart = true
  //         }
  //       })
  //     }

  //   }
  // }

  addToCart(product: any) {
    this._cart.addtoCart(product);
  }

}
