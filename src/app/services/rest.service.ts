import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  product: any[] = [];
  constructor(private http: HttpClient) { }

  url='http://localhost:5000'

  products(){
    return this.http.get(this.url+'/Product');
  }

}
