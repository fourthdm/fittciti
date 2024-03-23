import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token = ''
  private wishlist: number[] = [];

  constructor(private _http: HttpClient, private _rest: RestService, private _state: StateService) { }

  url = 'http://localhost:5000';

  addToWishlist(productId: number): Observable<any> {
    return this._http.post<any>(this.url + '/AddWishlist', { productId });
  }

  Addtowishlist(Product_id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this.token })
    return this._http.post(this.url + '/Addwishlist', Product_id, { headers });
  }


  // removeFromWishlist(productId: number): Observable<any> {
  //   const url = `${this.url}/${productId}`;
  //   return this._http.delete<any>(url);
  // }



  // AddToWishlist(Product_id: number): void {
  //   this._rest.checktoken();
  //   // const headers = new HttpHeaders({ 'x-access-token': this.token })
  //   if (!this.wishlist.includes(Product_id)) {
  //     this.wishlist.push(Product_id);
  //     // Optionally, you can store the wishlist in localStorage here
  //   }
  // }

  // Addtowishlist(Product_id: number) {
  //   this.checktoken();
  //   const headers = new HttpHeaders({ 'x-access-token': this.token })
  //   return this.http.post(this.url + '/Addwishlist', Product_id, { headers });
  // }

  // removeFromWishlist(productId: number): void {
  //   const index = this.wishlist.indexOf(productId);
  //   if (index !== -1) {
  //     this.wishlist.splice(index, 1);
  //     // Optionally, update localStorage if needed
  //   }
  // }

  getWishlist(): number[] {
    // You can also fetch wishlist from localStorage here
    return this.wishlist;
  }

}
