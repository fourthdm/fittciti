import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  product: any[] = [];
  report: any[] = [];
  cartData = new EventEmitter<any[] | []>();

  constructor(private http: HttpClient, private _router: Router, private _state: StateService) { }
  token = ''
  // cartData:any[]=[];

  url = 'http://localhost:5000';

  Login(data: any) {
    return this.http.post(this.url + '/login', data);
  }

  Registeration(data: any) {
    return this.http.post(this.url + '/Registeration', data);
  }

  enquiry(data: any) {
    return this.http.post(this.url + '/Contact', data);
  }

  category() {
    return this.http.get(this.url + '/Allcategory')
  }

  brand() {
    return this.http.get(this.url + '/Allbrand');
  }

  products() {
    return this.http.get(this.url + '/Product');
  }

  searchProduct(query: string) {
    return this.http.get(`http://localhost:5000/Product?q= ${query}`);
    // return this.http.get(this.url + '/Product?q=${query}')
  }

  homeproduct() {
    return this.http.get(this.url + '/homeProduct');
  }

  productwithmain(id: string) {
    return this.http.get(this.url + '/Productwithimages/' + id);
  }

  bycategoryandbrand(data: any) {
    return this.http.post(this.url + '/Productbycategoryandbrand', data);
  }

  bybrandid(Brand_id: number) {
    return this.http.get(this.url + '/Productbybrand/' + Brand_id);
  }

  decodeToken() {
    // this.report = jwt_decode(this.token);
    console.log(this.report);
  }

  // checktoken() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.token = token;
  //     this.decodeToken();
  //   } else {
  //     this._router.navigate(['/login']);
  //   }
  // }

  deleteproductfromcart(Product_id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this.token })
    return this.http.delete(this.url + '/DeletebyProduct/' + Product_id, { headers });
  }

  Getorder() {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this.token })
    return this.http.delete(this.url + '/Orders/', { headers });
  }

  // localAddToCart(data: any) {
  //   let cartData = [];
  //   let token = localStorage.getItem('token');
  //   if (!token) {
  //     localStorage.setItem('token', JSON.stringify([data]));
  //     this.cartData.emit([data]);
  //   } else {
  //     cartData = JSON.parse(token);
  //     cartData.push(data);
  //     localStorage.setItem('localCart', JSON.stringify(cartData));
  //     this.cartData.emit(cartData);
  //   }
  // }

  addwish(Product_id: number) {
    return this.http.post(this.url + '/wish', Product_id);
  }

  addtoCart(data: any) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this.http.post(this.url + '/AddCart', data, { headers });
  }

}
