import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-my-cleaner',
  templateUrl: './my-cleaner.component.html',
  styleUrls: ['./my-cleaner.component.scss'],
  providers: [ AppGlobals]
})
export class MyCleanerComponent implements OnInit {

  user: any;
  accessToken: any;
  deviceId: any;
  deviceType: any;
  accessI: any;
  apikey: 'cleaner@user#2';
  myCleaners: any;
  CleanerName = '';
  baseurl = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals,
    private booking: BookingService
  ) {
    window.scrollTo(0, 0);
    this.user = localStorage.getItem('uid');
    this.accessToken = localStorage.getItem('access_token');
    this.deviceId = localStorage.getItem('device_id');
    this.deviceType = localStorage.getItem('device_type');
    this.accessI = localStorage.getItem('access');

  }

  ngOnInit() {
    this.baseurl = this.baseUrl.baseAppUrl;
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
      base_url_client: this.baseUrl.baseAppUrlC,
      uid: this.user,
      device_id: this.deviceId,
      device_type: this.deviceType,
      api_key: this.apikey,
      access: this.accessI,
      access_token: this.accessToken
    };
    this.booking.mycleanerSrvs(data).subscribe((res: tokendata) => {
      this.myCleaners = res.data;
    });

    this.CleanerName = 'ANVÄNDARNAMN';
    if (localStorage.getItem('first_name')) {
      const lastname = localStorage.getItem('last_name');
      this.CleanerName = localStorage.getItem('first_name') + ' ' + lastname.charAt(0);
    }

  }

  seecleanerProfile(id) {
    localStorage.setItem('cleanerid', id);
    this.router.navigate(['/cleaner-profile']);
  }

}
