import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-future-bookings',
  templateUrl: './future-bookings.component.html',
  styleUrls: ['./future-bookings.component.scss'],
  providers: [ AppGlobals]
})
export class FutureBookingsComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) { window.scrollTo(0, 0);}

  ngOnInit() {
  }

}
