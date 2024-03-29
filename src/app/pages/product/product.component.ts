import { Component, Input, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() Category_id: any;
  @Input() Brand_id: any;

  @Input() selectedBrand: any;

  errormessage: string = " ";

  @Input() liked: boolean = false;

  AllCategory: any[] = [];
  AllBrand: any[] = [];
  Wishlist: any[] = [];
  productList: any[] = [];
  pro: any;

  productQuantity: number = 1;

  @Input() index = -1;

  @Input() id = 0;
  Quantity = 1;

  Product_id: number = 0;

  cartitem: any[] = [];

  constructor(private _rest: RestService,
    private _cart: CartService,
    private _wishlist: WishlistService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.getproduct();
    this.getCategory();
    this.getbrand();
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
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


  addToWishlist(Product_id: number) {

    this._wishlist.addToWishlist(Product_id).subscribe((data: any) => {
      console.log(data);
      this.Wishlist.push();
    }, (err: any) => {
      console.log(err);
      // this._router.navigate['/login']
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

  addCart() {
    // Assuming productData contains the necessary information about the product
    this._rest.addtoCart(this.Product_id, this.Quantity).subscribe(
      (response) => {
        console.log('Product added to cart successfully', response);
        // Handle success, maybe update UI or show a message
        this.cartitem.push(response);
      },
      (error) => {
        console.error('Error adding product to cart', error);
        // Handle error, maybe show an error message to the user
      }
    );
  }

  // ACArt() {
  //   const productId = this.id; // Example product ID
  //   const quantity = this.Quantity; // Example quantity
  //   this._rest.addToCart(productId, quantity).subscribe(
  //     response => {
  //       // Handle successful response
  //       console.log('Product added to cart:', response);
  //       this.cartitem.push();
  //     },
  //     error => {
  //       // Handle error
  //       console.error('Error adding product to cart:', error);
  //     }
  //   );
  // }

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
        alert(this.errormessage);                           // Show
      }
    },
      (err: any) => {
        console.log(err);
        this.errormessage = "Error occurred while fetching data."; // Set errorMessage for errors
      }
    )
  }



}
