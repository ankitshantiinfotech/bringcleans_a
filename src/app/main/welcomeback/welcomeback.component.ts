import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { BookingService } from '../../service/booking.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-welcomeback',
  templateUrl: './welcomeback.component.html',
  styleUrls: ['./welcomeback.component.scss'],
  providers: [ AppGlobals]
})
export class WelcomebackComponent implements OnInit {
  username = '';
  bookings = [];
  otherBookings = [];
  total = [];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '', '' ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };
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
    this.auth.getUserSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      this.username = res.data.first_name + ' ' + res.data.last_name;
    });
    this.booking.getAllListSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      this.otherBookings = res.data;
    });
    this.booking.getBookingListSrvs(data).subscribe((res: tokendata) => {
      this.bookings = res.data;
      console.log(this.bookings);

      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
    });
  }
  viewBooking(bookId, bookDetId) {
    localStorage.setItem('booking_id', bookId);
    localStorage.setItem('booking_det_id', bookDetId);
    this.router.navigate(['/day-info']);
  }
  addCleaner(id) {
    localStorage.setItem('bookingId', id);
    this.router.navigate(['/select-more-cleaner']);
  }
}
