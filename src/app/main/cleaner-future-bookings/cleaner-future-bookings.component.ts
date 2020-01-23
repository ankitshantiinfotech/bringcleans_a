import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { BookingService } from '../../service/booking.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';
@Component({
  selector: 'app-cleaner-future-bookings',
  templateUrl: './cleaner-future-bookings.component.html',
  styleUrls: ['./cleaner-future-bookings.component.scss'],
  providers: [ AppGlobals]
})
export class CleanerFutureBookingsComponent implements OnInit {
  otherBookings = [];
  starttime: any;
  currentBooking = [];
  futurBooking = [];
  pastBooking = [];
  selected = 'futur';
  constructor(
    private router: Router,
    private auth: AuthService,
    private booking: BookingService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0); }

  ngOnInit() {
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: 'cleaner@user#2',
      access: accessI,
      access_token: accessToken
    };
    this.booking.getAllListSrvs(data).subscribe((res: tokendata) => {
      this.starttime = res.data[0].starttime;
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      var currentTime = Date.now();
      if (res.data) {
          res.data.forEach(element => {
                var start = new Date(element.starttime);
                var end = new Date(element.endtime);
                if (start.getTime() < currentTime && currentTime < end.getTime()) {
                  this.currentBooking.push(element);
                }
                if (end.getTime() < currentTime) {
                  this.pastBooking.push(element);
                }
                if (currentTime < start.getTime()) {
                  this.futurBooking.push(element);
                }
          });
          // console.log('this.currentBooking');
          // console.log(this.currentBooking);
          // console.log('this.pastBooking');
          // console.log(this.pastBooking);
          // console.log('this.futurBooking');
          // console.log(this.futurBooking);
       }
    });
  }
  viewBooking(bookId, bookDetId) {
    localStorage.setItem('booking_id', bookId);
    localStorage.setItem('booking_det_id', bookDetId);
    this.router.navigate(['/day-info']);
  }

}
