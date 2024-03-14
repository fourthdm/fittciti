import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-on',
  templateUrl: './on.component.html',
  styleUrls: ['./on.component.css']
})
export class OnComponent implements OnInit {

  @Input() Category_id: any;
  @Input() Brand_id: any;
  errormessage: string = " ";

  @Input() liked: boolean = false;

  AllCategory: any[] = [];
  AllBrand: any[] = [];

  Wishlist: any[] = [];

  productList: any[] = [];
  pro: any;

  @Input() index = -1;

  constructor(private _rest: RestService, private _cart: CartService, private _activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.on();
    this.getproduct();
    this.getCategory();
    this.getbrand();
  }

  on() {
    // const Brand_id = this._activeroute.snapshot.paramMap.get('Brand_id');
    // console.log(Brand_id);
    this._rest.bybrandid(5).subscribe((data: any) => {
      this.productList = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  getproduct() {
    this._rest.products().subscribe((data: any) => {
      this.productList = data.data;
    }, (err: any) => {
      console.log(err);
    })

    this.productList.forEach((a: any) => {
      Object.assign(a, { quantity: 1, total: a.pricewithdiscount });
    });
  }

  getCategory() {
    this._rest.category().subscribe((data: any) => {
      console.log(data);
      this.AllCategory = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  getbrand() {
    this._rest.brand().subscribe((data: any) => {
      console.log(data);
      this.AllBrand = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  // togglelikes(id: number) {
  //   this._rest.addwish(id).subscribe((data: any) => {
  //     console.log(data);
  //     this.togglelike(id);
  //     this.Wishlist = data.data;
  //     this.liked = !this.liked; // Move the toggle inside the subscription block
  //   }, (err: any) => {
  //     console.log(err)
  //   });
  // }

  togglelikes(i: number) {
    this.togglelike(i);
  }

  togglelike(i: number) {
    this.productList[i].liked = !this.productList[i].liked;
  }

  addToCart(product: any) {
    this._cart.addtoCart(product);
  }

  Filter() {
    this._rest.bycategoryandbrand({ Category_id: this.Category_id, Brand_id: this.Brand_id }).subscribe((data: any) =>
    // {
    //   console.log(data);
    //   this.productList = data.data;
    // }, (err: any) => {
    //   console.log(err);
    // }
    {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.productList = data.data;
      } else {
        console.log("Data not found in the table.");
        this.errormessage = "Data not found in the table."; // Set errorMessage
      }
    },
      (err: any) => {
        console.log(err);
        this.errormessage = "Error occurred while fetching data."; // Set errorMessage for errors
      }
    )
  }


}
