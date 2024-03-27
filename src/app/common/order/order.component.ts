import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderData: any[] = [];

  constructor(private _rest: RestService, private _router: Router, private _activateroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.orders();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this._rest.cancelorder(orderId).subscribe((result) => {
      if (result) {
        this.orders();
      }
    })
  }

  orders() {
    this._rest.Getorder().subscribe((data: any) => {
      console.log();
      this.orderData = data.data;
    }, (err: any) => {
      console.log(err)
    })
  }

}
