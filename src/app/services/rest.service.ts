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

  category() {
    return this.http.get(this.url + '/Allcategory')
  }

  brand() {
    return this.http.get(this.url + '/Allbrand');
  }

  products() {
    return this.http.get(this.url + '/Product');
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


  // Addtowishlist(Product_id: number) {
  //   this.checktoken();
  //   const headers = new HttpHeaders({ 'x-access-token': this.token })
  //   return this.http.post(this.url + '/Addwishlist', Product_id, { headers });
  // }

  addwish(Product_id: number) {
    return this.http.post(this.url + '/wish', Product_id);
  }

}
