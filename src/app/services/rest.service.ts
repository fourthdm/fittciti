import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from './state.service';
import { Observable } from 'rxjs';

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


  Addorder(data: any) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this.http.post(this.url + '/Adddorder', data, { headers })
  }

  Getorder() {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.get(this.url + '/Orders/', { headers });
  }

  cancelorder(id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.delete(this.url + '/cancelorder/' + id, { headers });
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

  addtoCart(Product_id:number,Quantity:number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    const data = {Product_id:Product_id,Quantity:Quantity};
    return this.http.post(this.url + '/AddCart', data, { headers });
  }

  deleteproductfromcart(Product_id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.delete(this.url + '/DeletebyProduct/' + Product_id, { headers });
  }

  deletecart(Cart_id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.delete(this.url + '/Emptycart/' + Cart_id, { headers });
  }

  // addToCart(productId: number, quantity: number): Observable<any> {
  //   const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  //   this._state.checktoken();
  //   const headers = new HttpHeaders().set('x-access-token', this._state.token);
  //   const body = { Product_id: productId, Quantity: quantity };
  //   return this.http.post<any>(this.url, body, { headers });
  // }


  getallcart() {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this.http.get(this.url + '/Carts', { headers });
  }

}
