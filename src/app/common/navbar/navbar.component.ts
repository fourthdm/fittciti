import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalItem: number = 0;

  constructor(private _cart: CartService) { }

  ngOnInit(): void {

   
    this._cart.getProducts().subscribe(resp=>{
      this.totalItem = resp.length;
    })
  }

}
