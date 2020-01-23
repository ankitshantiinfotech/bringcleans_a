import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-future-booking-notification',
  templateUrl: './future-booking-notification.component.html',
  styleUrls: ['./future-booking-notification.component.scss'],
  providers: [ AppGlobals]
})
export class FutureBookingNotificationComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) { window.scrollTo(0, 0);}

  ngOnInit() {
  }

}
