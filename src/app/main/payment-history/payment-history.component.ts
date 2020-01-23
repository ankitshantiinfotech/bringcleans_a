import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  providers: [ AppGlobals]
})
export class PaymentHistoryComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) {window.scrollTo(0, 0); }

  ngOnInit() {
  }

}
