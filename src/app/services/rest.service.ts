import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  product: any[] = [];
  report: any[] = [];

  constructor(private http: HttpClient, private _router: Router) { }
  token = ''

  url = 'http://localhost:5000'

  products() {
    return this.http.get(this.url + '/Product');
  }

  productwithmain() {
    return this.http.get(this.url + '/Productwithmainimage');
  }

  decodeToken() {
    // this.report = jwt_decode(this.token);
    console.log(this.report);
  }
  checktoken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.decodeToken();
    } else {
      this._router.navigate(['/login']);
    }
  }

  deleteproductfromcart(Product_id: number) {
    this.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this.token })
    return this.http.delete(this.url + '/DeletebyProduct/' + Product_id, { headers });
  }

}
