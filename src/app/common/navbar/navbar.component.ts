import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menutype: string = 'default';



  public totalItem: number = 0;
  searchResult: any[] = [];


  constructor(private _cart: CartService, private _route: Router, private _rest: RestService) { }


  scrolltop = document.getElementById('scrolltop');
  rootelement = document.documentElement;

  scroll() {
    this.rootelement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  closeNavbar() {
    // Close the navbar by toggling the collapse class
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    if (navbarToggler) {
      navbarToggler.click();
    }
  }

  ngOnInit(): void {
    this._cart.getProducts().subscribe(resp => {
      this.totalItem = resp.length;
    })
    this.searchResult
  }


  logout() { }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this._rest.searchProduct(element.value).subscribe((result: any) => {

        if (result.length > 5) {
          result.length = length
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult.length == 0;
  }
  redirectToDetails(id: number) {
    this._route.navigate(['/viewproduct/' + id])
  }
  submitSearch(val: string) {
    console.warn(val)
    this._route.navigate([`search/${val}`]);
  }


}
