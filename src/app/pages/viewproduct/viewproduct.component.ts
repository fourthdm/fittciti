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
  constructor(private _rest: RestService, private _cart: CartService, private _activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getproduct();
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

  addToCart(product: any) {
    this._cart.addtoCart(product);
  }

}
