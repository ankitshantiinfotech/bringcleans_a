import {Component, OnDestroy, OnInit,ViewChild,ElementRef} from '@angular/core';import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';
import { BookingService } from '../../service/booking.service';


import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-cleaner-profile',
  templateUrl: './cleaner-profile.component.html',
  styleUrls: ['./cleaner-profile.component.scss'],
  providers: [ AppGlobals]
})
export class CleanerProfileComponent implements OnInit {

  displayedColumns: string[] = ['name','symbol'];
  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  user: any;
  accessToken: any;
  deviceId: any;
  deviceType: any;
  accessI: any;
  apikey: 'cleaner@user#2';
  myCleaner: any = [];
  bookings: any;
  nextbooking: any;
  daysleft: any;
  cb: any;
  baseurl = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals,
    private booking: BookingService
  ) {
    this.user = localStorage.getItem('uid');
    this.accessToken = localStorage.getItem('access_token');
    this.deviceId = localStorage.getItem('device_id');
    this.deviceType = localStorage.getItem('device_type');
    this.accessI = localStorage.getItem('access');
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    const cleanerid = localStorage.getItem('cleanerid');
    this.baseurl = this.baseUrl.baseAppUrl;
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
      base_url_client: this.baseUrl.baseAppUrlC,
      uid: this.user,
      cleaner_id: cleanerid,
      device_id: this.deviceId,
      device_type: this.deviceType,
      api_key: this.apikey,
      access: this.accessI,
      access_token: this.accessToken
    };
    this.booking.mycleanerProfileSrvs(data).subscribe((res: tokendata) => {
      this.myCleaner = res.cleaner[0];

      //this.bookings = res.data;
      this.cb = res.data;
      this.bookings = new MatTableDataSource(res.data);
      this.bookings.paginator = this.paginator;
      this.bookings.sort = this.sort;

      this.nextbooking = res.next_bookingdata[0];
      const dt1 = new Date();
      const dt2 = new Date(this.nextbooking.starttime);
      this.daysleft = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
      );
    });
  }
  viewBooking(bookId, bookDetId) {
    localStorage.setItem('booking_id', bookId);
    localStorage.setItem('booking_det_id', bookDetId);
    this.router.navigate(['/day-info']);
  }
}
