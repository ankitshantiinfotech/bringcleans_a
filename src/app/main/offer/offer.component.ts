import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../service/auth.service';
import { BookingService } from '../../service/booking.service';
import { tokendata} from '../home/variable';
import { AppGlobals } from '../../app.global';
import { EventInput } from '@fullcalendar/core';
import { LoginHeaderComponent } from 'src/app/layout/login-header/login-header.component';
import svLocale from '@fullcalendar/core/locales/sv';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  providers: [ AppGlobals]
})
export class OfferComponent implements OnInit {
  calendarPlugins = [dayGridPlugin]; // important!
  requests = [];
  otherBookings = [];
  requestCount = '';
  successMsg = '';
  errorMsg = '';
  success = true;
  error = true;
  eventsdata: EventInput[] = [];
  events: any;

  locales = [svLocale];

   user = localStorage.getItem('uid');
   accessToken = localStorage.getItem('access_token');
   deviceId = localStorage.getItem('device_id');
   deviceType = localStorage.getItem('device_type');
   accessI = localStorage.getItem('access');

   data = {
    base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
    uid: this.user,
    device_id: this.deviceId,
    device_type: this.deviceType,
    api_key: 'cleaner@user#2',
    access: this.accessI,
    access_token: this.accessToken
  };


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals,
    private booking: BookingService
  ) {window.scrollTo(0, 0); }

  ngOnInit() {
    this.booking.getCleanerReqListSrvs(this.data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errorMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      this.requests = res.data;

      this.requestCount = res.total_count;
    });

  }

  ngAfterViewInit() {
    this.booking.getAllListSrvs(this.data).subscribe((res: tokendata) => {
      this.otherBookings = res.data;
      console.log(this.otherBookings);

      if (res.status == '2') {
        this.errorMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      let event = [];
      this.otherBookings.forEach(booking => {
        event.push({
          title: booking.first_name + ' ' + booking.last_name,

          date:booking.starttime

        });
      });
      this.eventsdata = event;

    });
  }

  viewBooking(bookId, bookDetId) {
    localStorage.setItem('booking_id', bookId);
    localStorage.setItem('booking_det_id', bookDetId);
    // window.open('/day-info' , '_blank');
    // this.router.navigate(['/day-info']);
  }
  confirmBooking(book, request) {
    localStorage.setItem('book', book);
    localStorage.setItem('request', request);
    localStorage.setItem('type', 'confirm');
    const dialogRef = this.dialog.open(ComformBookingPopup);
    dialogRef.afterClosed().subscribe(result => {
      const popmessage = localStorage.getItem('popmessage');
      const status = localStorage.getItem('popstatus');
      console.log(status);

      if (status != 'null' && status != null) {
        if (status == '1') {
          let count = parseInt(document.getElementById('offerCount').innerText, 10);
          count--;
          document.getElementById('offerCount').innerText = count.toString();
          this.success = false;
          this.successMsg = popmessage;
          setTimeout(() => {
            this.success = true;
            this.successMsg = '';
            localStorage.removeItem('popmessage');
            localStorage.removeItem('popstatus');
          }, 3000);
        } else {
          this.error = false;
          this.errorMsg = popmessage;
          setTimeout(() => {
            this.error = true;
            this.errorMsg = '';
            localStorage.removeItem('popmessage');
            localStorage.removeItem('popstatus');
          }, 3000);
        }
      }
    });
  }
  denyBooking(book, request) {
    localStorage.setItem('book', book);
    localStorage.setItem('request', request);
    localStorage.setItem('type', 'deny');
    const dialogRef = this.dialog.open(ComformBookingPopup);
    dialogRef.afterClosed().subscribe(result => {
      const status = localStorage.getItem('popstatus');
      const popmessage = localStorage.getItem('popmessage');
      if (status != 'null' && status != null) {
        if (status == '1') {
          let count = parseInt(document.getElementById('offerCount').innerText, 10);
          count--;
          document.getElementById('offerCount').innerText = count.toString();
          this.success = false;
          this.successMsg = popmessage;
          setTimeout(() => {
            this.success = true;
            this.successMsg = '';
            localStorage.removeItem('popstatus');
            localStorage.removeItem('popmessage');
          }, 3000);
        } else {
          this.error = false;
          this.errorMsg = popmessage;
          setTimeout(() => {
            this.error = true;
            this.errorMsg = '';
            localStorage.removeItem('popstatus');
            localStorage.removeItem('popmessage');
          }, 3000);
        }
      }
    });
  }
}

@Component({
  selector: 'offer-poppup',
  templateUrl: 'offer-poppup.html',
  styleUrls: ['./offer.component.scss'],
  providers: [ AppGlobals]

})
export class ComformBookingPopup implements OnInit {
  type = 'confirm';
  bookId = '';
  requestid = '';
  constructor(
    private router: Router, private auth: AuthService,
    public dialogRef: MatDialogRef<ComformBookingPopup>,
    private booking: BookingService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0); }
  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.bookId = localStorage.getItem('book');
    this.requestid = localStorage.getItem('request');
    document.getElementById('type').innerText = this.type;
  }
  confirmBooking(book, request) {
    document.getElementById('conf' + request).setAttribute('disabled', 'disabled');
    document.getElementById('croxx_' + request).style.display = 'none';
    document.getElementById('closepop').setAttribute('disabled', 'disabled');
    document.getElementById('confYes').setAttribute('disabled', 'disabled');
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
      access_token: accessToken,
      request_id: request,
      booking_id: book
    };
    this.booking.acceptBookingSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      localStorage.setItem('popstatus', res.status);
      localStorage.setItem('popmessage', res.message);
      if (res.status) {
        document.getElementById('closepop').removeAttribute('disabled');
        document.getElementById('confYes').removeAttribute('disabled');
        document.getElementById('booking' + book).style.display = 'none';
        document.getElementById('closepop').click();
      } else {
        document.getElementById('closepop').removeAttribute('disabled');
        document.getElementById('confYes').removeAttribute('disabled');
        document.getElementById('conf' + request).removeAttribute('disabled');
        document.getElementById('croxx_' + request).style.display = '';
        document.getElementById('closepop').click();
      }
    });
  }
  denyBooking(book, request) {
    document.getElementById('conf' + request).setAttribute('disabled', 'disabled');
    document.getElementById('croxx_' + request).style.display = 'none';
    document.getElementById('closepop').setAttribute('disabled', 'disabled');
    document.getElementById('denyYes').setAttribute('disabled', 'disabled');
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
      access_token: accessToken,
      request_id: request,
      booking_id: book
    };
    this.booking.rejectBookingSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      localStorage.setItem('popstatus', res.status);
      localStorage.setItem('popmessage', res.message);
      if (res.status) {
        document.getElementById('closepop').removeAttribute('disabled');
        document.getElementById('denyYes').removeAttribute('disabled');
        document.getElementById('booking' + book).style.display = 'none';
        document.getElementById('closepop').click();
      } else {
        document.getElementById('closepop').removeAttribute('disabled');
        document.getElementById('denyYes').removeAttribute('disabled');
        document.getElementById('conf' + request).removeAttribute('disabled');
        document.getElementById('croxx_' + request).style.display = '';
        document.getElementById('closepop').click();
      }
    });
  }
}

@Component({
  selector: 'offer-poppup-cencel',
  templateUrl: 'offer-poppup-cencel.html',
  styleUrls: ['./offer.component.scss'],
  providers: [ AppGlobals]
})
export class CencelBookingPopup {
  constructor(
    private router: Router, private auth: AuthService,
    public dialogRef: MatDialogRef<CencelBookingPopup>,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);
    }
}
