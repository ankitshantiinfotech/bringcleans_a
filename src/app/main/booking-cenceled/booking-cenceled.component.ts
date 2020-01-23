import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { BookingService } from '../../service/booking.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-booking-cenceled',
  templateUrl: './booking-cenceled.component.html',
  styleUrls: ['./booking-cenceled.component.scss'],
  providers: [ AppGlobals]
})
export class BookingCenceledComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private booking: BookingService,
    private baseUrl: AppGlobals
  ) { window.scrollTo(0, 0);}
  bookingDet: any = [];
  ngOnInit() {
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const bookId = localStorage.getItem('booking_id');
    const bookDetId = localStorage.getItem('booking_det_id');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
      base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: 'cleaner@user#2',
      access: accessI,
      access_token: accessToken,
      booking_id: bookDetId,
      booking_details_id: bookId
    };
    this.booking.getBookDetailsSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      this.bookingDet = res.data[0];
    });
  }

}
